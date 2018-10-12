function MakerIFTTT(key) {
    this.key = key;
    this._baseurl = "https://maker.ifttt.com/trigger/";
    this._withkey = "/with/key/";
}

MakerIFTTT.prototype.triggerAsync = function(event, data, callback) {
    fetch(this._baseurl + event + this._withkey + this.key, {
            method: "POST",
            mode: "no-cors",
            headers: {
                // "Content-Type": "application/json; charset=utf-8",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `value1=${data.value1}&value2=${data.value2}&value3=${data.value3}`,
            // body: JSON.stringify(data),
        })
        .then(callback);
}

var makerAPI = new MakerIFTTT('dLjONdUuzIkhES7YhkZheZ');

function formatDuration(duration){
  duration /= 1000;
  var hours = Math.round(duration / 3600);
  var minutes = Math.round(duration % 3600 / 60);
  var seconds = Math.round(duration % 60);
  return `${hours}:${minutes}:${seconds}`;
}

var LabAPI = {
  signin: function(name, email, callback){
    localStorage.setItem('lab-name', name);
    localStorage.setItem('lab-email', email);
    localStorage.setItem('lab-time', Date.now());
    callback();
  },
  signout: function(callback){
    var name = this.getUserName();
    var email = this.getUserEmail();
    var enterTime = localStorage.getItem('lab-time');
    var totalTime = Date.now() - enterTime;
    localStorage.removeItem('lab-name');
    localStorage.removeItem('lab-email');
    localStorage.removeItem('lab-time');
    makerAPI.triggerAsync('lab_time', {value1: name, value2: email, value3: formatDuration(totalTime)});
    callback();
  },
  reset: function(){
    // TODO: figure out what to do in this case
  },
  isInLab: function(){
    return this.getUserName() !== null;
  },
  getUserName: function(){
    return localStorage.getItem('lab-name');
  },
  getUserEmail: function(){
    return localStorage.getItem('lab-email');
  }
};

Object.freeze(LabAPI);
