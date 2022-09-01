import { ModalCommand } from "../../command";
import { Validation } from "../../models";


export class VerificationCodeModalCommand extends ModalCommand {
    name = "verificationCodeStudentModal"

    protected async executable(): Promise<void> {
        const user = this.interaction.user.id
        const code = this.interaction.fields.getTextInputValue("verificationCodeStudentInput")

        if (!code) {
            await this.replySilent("Verifikační klíč nebyl zaslán")
            return
        }
        if (code.length !== 6) {
            await this.replySilent("Verifikační klíč musí mít právě 6 znaků")
            return
        }

        const validation = await Validation.findOne({ where: { user: user, key: code } })
        if (!validation) {
            await this.replySilent("Verifikační klíč není platný")
            return
        }
        if (validation.expiresAt <= new Date()) {
            await this.replySilent("Platnost verifikačního klíče vypršela")
            return
        }

        if (this.hasRole("Návštěva")) {
            await this.removeRole("Návštěva")
        }
        await this.addRole("Student")
        await this.replySilent("Úspěšně jste se oveřil!")
        await validation.remove()
    }
}
