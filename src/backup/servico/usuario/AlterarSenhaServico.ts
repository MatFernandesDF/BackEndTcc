import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

class AlterarSenhaServico {
  async execute({ user_id, novasenha, confirmarsenha }: { user_id: string; novasenha: string; confirmarsenha: string }) {
    if (novasenha !== confirmarsenha) {
      throw new Error("A nova senha e a confirmação de senha não correspondem.");
    }

    // Hash da nova senha antes de salvar no banco
    const senhaHash = await bcrypt.hash(novasenha, 10);

    // Atualizar a senha do usuário no banco
    await prisma.usuario.update({
      where: { id: user_id },
      data: { senha: senhaHash },
    });

    return {
      message: "Senha alterada com sucesso.",
    };
  }
}

export {AlterarSenhaServico};