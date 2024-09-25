document.getElementById('btn-edit-info').addEventListener('click', function() {
    // Fecha o modal atual (modalUser)
    var modalUser = new bootstrap.Modal(document.getElementById('modalUser'));
    modalUser.hide();

    // Abre o modal de editar informações (exampleModal)
    var exampleModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    exampleModal.show();
});
