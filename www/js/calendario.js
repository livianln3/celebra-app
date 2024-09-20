document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Mostra o calendário no modo mês
        headerToolbar: {
            left: 'prev,next today', // Navegação de mês
            center: 'title', // Título do mês
            right: 'dayGridMonth,timeGridWeek,timeGridDay' // Modos de visualização
        },
        events: [
            // Exemplos de eventos
            {
                title: 'Evento 1',
                start: '2024-09-20',
                end: '2024-09-21'
            },
            {
                title: 'Evento 2',
                start: '2024-09-25T12:30:00',
                allDay: false // Evento com hora específica
            }
        ],
        dateClick: function(info) {
            openEventModal(info.date); // Abre o modal ao clicar em um dia
        }
    });

    calendar.render(); // Renderiza o calendário no div

    // Exibir o modal para criar ou editar um evento
    function openEventModal(date) {
        const modal = document.getElementById('eventModal');
        const eventTitle = document.getElementById('eventTitle');
        const eventDate = document.getElementById('eventDate');

        // Limpar campos
        eventTitle.value = '';
        eventDate.value = '';

        // Definir a data no campo de entrada
        const formattedDate = date.toISOString().slice(0, 16);
        eventDate.value = formattedDate;

        modal.style.display = 'block';
    }

    // Fechar o modal
    function closeEventModal() {
        const modal = document.getElementById('eventModal');
        modal.style.display = 'none';
    }

    // Manipulador para o botão de salvar evento
    document.getElementById('saveEventButton').onclick = function() {
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;

        // Aqui você pode chamar a API da Cronofy para criar o evento
        createEvent(title, date);

        // Fechar o modal após salvar
        closeEventModal();
    };

    // Fechar o modal ao clicar no botão de cancelar
    document.getElementById('cancelButton').onclick = closeEventModal;

    // Função para criar um evento na API da Cronofy
    async function createEvent(title, date) {
        const response = await fetch('https://api.cronofy.com/v1/events', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Substitua pelo token de acesso
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event: {
                    summary: title,
                    start: {
                        time: date,
                        timezone: 'America/Sao_Paulo' // Ajuste o fuso horário conforme necessário
                    },
                    end: {
                        time: new Date(new Date(date).getTime() + 60 * 60 * 1000), // 1 hora depois
                        timezone: 'America/Sao_Paulo'
                    }
                }
            })
        });

        if (!response.ok) {
            console.error('Erro ao criar evento:', response.statusText);
        } else {
            console.log('Evento criado com sucesso!');
            // Opcional: Você pode adicionar o evento diretamente ao calendário aqui
            calendar.addEvent({
                title: title,
                start: date,
                end: new Date(new Date(date).getTime() + 60 * 60 * 1000), // 1 hora depois
                allDay: false
            });
        }
    }
});
