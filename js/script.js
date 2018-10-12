function formatTime(time){
  var date = new Date(+time);

  var mins = date.getMinutes();
  if (mins < 10){
    mins = '0' + mins;
  }

  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${mins}`
}


function refreshUI(){
  if (!LabAPI.isInLab()){
    document.getElementById('sign-in').classList.remove('hidden')
    document.getElementById('sign-out').classList.add('hidden')
    document.getElementById('who').innerHTML = ''
  } else {
    document.getElementById('sign-in').classList.add('hidden')
    document.getElementById('sign-out').classList.remove('hidden')
    document.getElementById('who').innerHTML = `Signed in as ${LabAPI.getUserName()} (${LabAPI.getUserEmail()}) at ${formatTime(localStorage.getItem('lab-time'))}`
  }
}

refreshUI();

document.getElementById('sign-out').addEventListener('click', (e) => {
  LabAPI.signout(() => {
    NotificationManager.create('Signed out', 'You are no longer at the lab');
    refreshUI();
  });
})
