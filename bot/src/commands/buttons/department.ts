import { ButtonCommand } from "../../command"

export class DepartmentFirewallButtonComamand extends ButtonCommand {
    name = "bntDepartment"

    async executable(): Promise<void> {
        if (this.hasRole("Student")) {
            await this.replySilent("Student nemůže být součástí Katedry.")
            return

        } else if (this.hasRole("Návštěva")) {
            await this.replySilent("Host nemůže být součástí Katedry.")
            return

        } else if (this.hasRole("Katedra")) {
            await this.replySilent("Již jste součástí Katedry.")
            return
        }

        await this.guild().members.fetch({ withPresences: true })
        const users = (await this.guild().roles.fetch())
            .filter((role) => [this.getRoleID("Katedra"), this.getRoleID("Root")].includes(role.id))
            .map((role) => role.members.map(member => member))
            .reduce((acc, members) => acc.concat(members), [])
            .sort((member) => member.roles.highest.id === this.getRoleID("Katedra") ? -1 : 1)
            .map((member) => member.user)

        await this.replySilent(`Pro přidělení této role kontaktujte jednoho z těchto uživatelů ${users}.`)
    }
}
