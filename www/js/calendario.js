document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            {
                title: 'Evento 1',
                start: '2024-09-20',
                end: '2024-09-21'
            },
            {
                title: 'Evento 2',
                start: '2024-09-25T12:30:00',
                allDay: false
            }
        ],
        dateClick: function(info) {
            openChoiceModal(info.date);
        }
    });

    calendar.render();

    function openChoiceModal(date) {
        const choiceModal = document.getElementById('choiceModal');
        choiceModal.style.display = 'block';

        document.getElementById('createReminderButton').onclick = function() {
            closeChoiceModal();
            openEventModal(date);
        };

        document.getElementById('createPlanButton').onclick = function() {
            closeChoiceModal();
            openPlanModal(date); 
        };

        document.getElementById('closeChoiceModal').onclick = closeChoiceModal;
    }

    function closeChoiceModal() {
        const choiceModal = document.getElementById('choiceModal');
        choiceModal.style.display = 'none';
    }

    function openEventModal(date) {
        const modal = document.getElementById('eventModal');
        const eventTitle = document.getElementById('eventTitle');
        const eventDate = document.getElementById('eventDate');

        eventTitle.value = '';
        eventDate.value = '';

        const formattedDate = date.toISOString().slice(0, 16);
        eventDate.value = formattedDate;

        modal.style.display = 'block';
    }

    function closeEventModal() {
        const modal = document.getElementById('eventModal');
        modal.style.display = 'none';
    }

    function openPlanModal(date) {
        const planModal = document.getElementById('planModal');
        const eventTitle = document.getElementById('planEventTitle');
        const eventTime = document.getElementById('planEventTime');
        const eventLocation = document.getElementById('planEventLocation');
        const eventGuests = document.getElementById('planEventGuests');
        const preparativosList = document.getElementById('preparativosList');

        // Limpar campos
        eventTitle.value = '';
        eventTime.value = '';
        eventLocation.value = '';
        eventGuests.value = '';
        preparativosList.innerHTML = '';

        planModal.style.display = 'block';
    }

    function closePlanModal() {
        const planModal = document.getElementById('planModal');
        planModal.style.display = 'none';
    }

    document.getElementById('addPreparativoButton').onclick = function() {
        const preparativoInput = document.getElementById('preparativoInput');
        const preparativoText = preparativoInput.value.trim();

        if (preparativoText !== '') {
            addPreparativoToList(preparativoText);
            preparativoInput.value = '';
        }
    };

    function addPreparativoToList(text) {
        const preparativosList = document.getElementById('preparativosList');
    
        const listItem = document.createElement('li');
        listItem.style.display = 'flex'; 
    
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'preparativoCheckbox';
    
        const span = document.createElement('span');
        span.textContent = text;
        span.style.marginLeft = '3px'; // Diminuição do espaço entre checkbox e texto
    
        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        preparativosList.appendChild(listItem);
    }
    
    

    document.getElementById('saveEventButton').onclick = function() {
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;

        createEvent(title, date);

        closeEventModal();
    };

    document.getElementById('savePlanButton').onclick = function() {
        const title = document.getElementById('planEventTitle').value;
        const time = document.getElementById('planEventTime').value;
        const location = document.getElementById('planEventLocation').value;
        const guests = document.getElementById('planEventGuests').value;

        const preparativos = Array.from(document.querySelectorAll('#preparativosList li')).map(item => {
            return {
                text: item.querySelector('span').textContent,
                checked: item.querySelector('input[type="checkbox"]').checked
            };
        });

        console.log('Planejamento salvo:', { title, time, location, guests, preparativos });

        closePlanModal();
    };

    document.getElementById('cancelButton').onclick = closeEventModal;

    document.getElementById('cancelPlanButton').onclick = closePlanModal;

    // criar um evento na API da Cronofy
    async function createEvent(title, date) {
        const response = await fetch('https://api.cronofy.com/v1/events', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Lembrar de colocar o token de acesso na hora do backend
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event: {
                    summary: title,
                    start: {
                        time: date,
                        timezone: 'America/Sao_Paulo' 
                    },
                    end: {
                        time: new Date(new Date(date).getTime() + 60 * 60 * 1000),
                        timezone: 'America/Sao_Paulo'
                    }
                }
            })
        });

        if (!response.ok) {
            console.error('Erro ao criar evento:', response.statusText);
        } else {
            console.log('Evento criado com sucesso!');
            calendar.addEvent({
                title: title,
                start: date,
                end: new Date(new Date(date).getTime() + 60 * 60 * 1000), 
                allDay: false
            });
        }
    }
});
