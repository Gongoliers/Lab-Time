document.getElementById('name').value = localStorage.getItem('last-name');
document.getElementById('email').value = localStorage.getItem('last-email');


document.getElementById('submit').addEventListener('click', (e) => {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;

  localStorage.setItem('last-name', name);
  localStorage.setItem('last-email', email);

  // TODO: submit form
  LabAPI.signin(name, email, () => {
    NotificationManager.create('Success', `Welcome to the lab, ${name}`);
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  });
})
