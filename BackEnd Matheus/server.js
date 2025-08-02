import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.use(cors('http://localhost:3000'))

app.post('/usuarios', async (req, res) => {
    try {
        const novoUsuario = await prisma.users.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }
        })

        res.status(201).json({ mensagem: "Usuário criado com sucesso!", dados: novoUsuario })
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar usuário." })
    }
})

app.get('/usuarios', async (req, res) => {
    if(req.query) {
        let usuarios = await prisma.users.findMany({
            where: {
                OR: [
                    { name: { contains: req.query.name } },
                    { email: { contains: req.query.email } },
                    { age: { contains: req.query.age } }
                ].filter(Boolean) // remove os undefineds
            }
        })
    } else {
            usuarios = await prisma.users.findMany();
        }

    try {
        const usuarios = await prisma.users.findMany()
        res.status(200).json(usuarios)
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ erro: "Erro ao buscar usuários." })
    }
})


app.put('/usuarios/:id', async (req, res) => {
    console.log(req)
    try {
       const usuarioAtualizado = await prisma.users.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }
        })

         res.status(200).json({ mensagem: "Usuário atualizado com sucesso!", dados: usuarioAtualizado })
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar usuário." })
    } 
})


app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.users.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        res.status(200).json({ mensagem: "Usuário deletado com sucesso!" })
    } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar usuário." })
    }
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})


