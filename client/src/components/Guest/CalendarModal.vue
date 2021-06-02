<template>
    <modal name="calendarModal" height="auto" @before-open="beforeOpen" width="750px">
        <div class="calendar requests-div">
            <span class="calendar-header">Takvim</span>
            <div class="calendar-div" v-if="calendarOptions.events">
                <FullCalendar :options="calendarOptions" :events="events" />
            </div>
        </div>
    </modal>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';

export default {
    components: {
        FullCalendar
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin],
                initialView: 'dayGridMonth',
                locale: 'tr',
                headerToolbar: { right: 'prev next' },
                firstDay: 1,
                events: null,
                eventDisplay: 'block',
                displayEventTime: false
            }
        };
    },
    methods: {
        beforeOpen(event) {
            const requests = event.params.requests;
            const eventsArr = requests.map((request) => {
                return {
                    //start: request.createdDate,
                    start: request.dueDate,
                    title: request.header,
                    id: request.projectId,
                    backgroundColor: request.isFinished ? 'green' : 'red'
                };
            });
            this.calendarOptions.events = eventsArr;
        }
    }
};
</script>

<style lang="scss">
.calendar {
    &-header {
        font-size: 1.3rem;
        width: 100%;
    }
    &-div {
        margin-top: 0.5rem;
    }
}
.fc-day-today {
    background-color: #e6bb2f !important;
}
.fc-event-title-container {
    cursor: default;
}
</style>