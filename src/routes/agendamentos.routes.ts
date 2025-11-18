import { Router } from "express";
import { prisma } from "../prisma/client";

const router = Router();

const dateRegex = /^([0-2]\d|3[01])\-(0\d|1[0-2])\-\d{4}$/;

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

/* POST /agendamentos
 * body: { nome, servico, data, hora } */
router.post("/", async (req, res) => {
  try {
    const { nome, servico, data, hora } = req.body;

    if (!nome || !servico || !data || !hora) {
      return res.status(400).json({
        message: "Campos obrigatórios: nome, servico, data, hora.",
      });
    }
    if (nome.trim().length > 80) {
      return res
        .status(400)
        .json({ message: "Nome deve ter no máximo 80 caracteres." });
    }
    if (!dateRegex.test(data)) {
      return res.status(400).json({
        message: "Formato de data inválido. Use dd-mm-aaaa, ex: 21-11-2025.",
      });
    }
    if (!timeRegex.test(hora)) {
      return res.status(400).json({
        message: "Formato de hora inválido. Use hh:mm, ex: 14:30.",
      });
    }

    const [diaStr, mesStr, anoStr] = data.split('-');
    const dia = Number(diaStr);
    const mes = Number(mesStr);
    const ano = Number(anoStr);

    const dataAgendamento = new Date(ano, mes - 1, dia);
    const hoje = new Date();

    dataAgendamento.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);

    if (dataAgendamento < hoje) {
      return res.status(400).json({
        message: 'Não é permitido criar agendamentos em datas passadas.',
      });
    }
    

    const agendamento = await prisma.agendamento.create({
      data: {
        nome,
        servico,
        data,
        hora,
      },
    });

    return res.status(201).json(agendamento);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar agendamento." });
  }
});

/* GET /agendamentos */
router.get("/", async (_req, res) => {
  try {
    const agendamentos = await prisma.agendamento.findMany({
      orderBy: { id: "desc" },
    });

    return res.json(agendamentos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao listar agendamentos." });
  }
});

/* GET /agendamentos/:id */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const agendamento = await prisma.agendamento.findUnique({
      where: { id },
    });

    if (!agendamento) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    return res.json(agendamento);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar agendamento." });
  }
});

/* DELETE /agendamentos/:id */
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const agendamento = await prisma.agendamento.findUnique({
      where: { id },
    });

    if (!agendamento) {
      return res.status(404).json({ message: "Agendamento não encontrado." });
    }

    await prisma.agendamento.delete({
      where: { id },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao deletar agendamento." });
  }
});

export default router;
