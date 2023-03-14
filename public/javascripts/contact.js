const socket = io();
window.onload=()=>{
    let token = localStorage.getItem('session');
    socket.emit('getmyTickets',{token:token})
    socket.on('giveUserTickets',async(tickets)=>{
        showTickets(tickets);
    })
    socket.on('newTicket'+token,async(tickets)=>{
        showTickets(tickets);
    })
}
