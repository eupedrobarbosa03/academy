export class BoxCategory {
    constructor() { }
    ;
    instructor(name, cpf, telephone, specialty) {
        const box = `
                <div class="container-informations-instructors">
                    <p class="">
                        Instrutor:
                        <span class="informations-instructors-box-instructor info-for-search">${name}</span>
                    </p>
                    <p class="">
                        CPF:
                        <span class="informations-instructors-box-instructor info-cpf-instructor info-for-search">${cpf}</span>
                    </p>
                    <p class="">
                        Telefone:
                        <span class="informations-instructors-box-instructor">${telephone}</span>
                    </p>
                    <p class="">
                        Especialidade:
                        <span class="informations-instructors-box-instructor">${specialty}</span>
                    </p>
                    <p class="">
                        Status:
                        <span class="informations-instructors-box-instructor">Ativo</span>
                    </p>
                </div>
                <div class="container-actions-box-instructors">
                    <i class="fa-solid fa-pen-to-square icon-edit-instructor"></i>
                    <i class="fa-solid fa-trash icon-remove-instructor"></i>
                    <div class="information-action-edit-instructor information-action">
                        <p class="">Editar</p>
                    </div>
                    <div class="information-action-remove-instructor information-action">
                        <p class="">Remover</p>
                    </div>
                </div>
        `;
        return box;
    }
    ;
}
;
