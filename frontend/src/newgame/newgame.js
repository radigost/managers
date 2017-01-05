/**
 * Created by user on 05.01.17.
 */
var Company, gameCtrl, tpl,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Company = require('../Class/Company.js');

tpl = require('./newgame.jade');

gameCtrl = (function() {
  function gameCtrl(localStorage, Restangular, cookies) {
    this.localStorage = localStorage;
    this.Restangular = Restangular;
    this.cookies = cookies;
    this.create = bind(this.create, this);
    this.generateImages = bind(this.generateImages, this);
    this.startGame = bind(this.startGame, this);
    this.chooseAvatar = bind(this.chooseAvatar, this);
    this.chooseIndustry = bind(this.chooseIndustry, this);
    this.chooseSpecialty = bind(this.chooseSpecialty, this);
    this.toggle = bind(this.toggle, this);
    this.minus = bind(this.minus, this);
    this.plus = bind(this.plus, this);
    this.$onInit = bind(this.$onInit, this);
    this.images = [];
    this.gameName = "Экран выбора персонажа";
    this.stats = {
      items: [
        {
          id: 1,
          caption: "Активность",
          value: 5,
          max: 9,
          min: 1,
          name: 'activeness'
        }, {
          id: 2,
          caption: "Связи",
          value: 5,
          max: 9,
          min: 1,
          name: 'network'
        }, {
          id: 3,
          caption: "Психология",
          value: 5,
          max: 9,
          min: 1,
          name: 'psychology'
        }, {
          id: 4,
          caption: "Интелект",
          value: 5,
          max: 9,
          min: 1,
          name: 'intellect'
        }, {
          id: 5,
          caption: "Интроверсия - Экстроверсия",
          value: 3,
          max: 3,
          min: 1,
          name: 'introversion'
        }
      ]
    };
    this.specialties = {
      items: [
        {
          id: 2,
          caption: "Любимец государства",
          tooltip: "Хорошо получается работать с гос. сектором"
        }, {
          id: 3,
          caption: "Прошаренный",
          tooltip: "Знает технологию по которой работает компания"
        }, {
          id: 4,
          caption: "Большой чек",
          tooltip: "Получает дополнительную возможность успешно продать если чек большой"
        }, {
          id: 5,
          caption: "Телефонный маньяк",
          tooltip: "Может делать огромное количество звонков,но на личных встречах ведет себя не очень"
        }
      ]
    };
    this.perks = {
      items: [
        {
          id: 1,
          caption: "Парень с заводского",
          chosen: false
        }, {
          id: 2,
          caption: "Белый воротничок",
          chosen: false
        }, {
          id: 3,
          caption: "Раздолбай",
          chosen: false
        }
      ]
    };
    this.indusrty = {
      items: [
        {
          id: 1,
          caption: "Строительство"
        }, {
          id: 2,
          caption: "Сельское Хозяйство"
        }, {
          id: 3,
          caption: "FMCG"
        }, {
          id: 4,
          caption: "Государственный сектор"
        }
      ]
    };
    this.points = 5;
  }

  gameCtrl.prototype.$onInit = function() {
    this.Restangular.one('api/v1/persons').get().then((function(_this) {
      return function(res) {
        _this.players = res;
      };
    })(this));
    this.current = {
      stats: {
        personality: {
          activeness: 5,
          network: 5,
          psychology: 5,
          intellect: 5,
          introversion: 5
        },
        specialties: [this.specialties.items[0]],
        knowProduct: 1,
        minCalls: 7,
        maxCalls: 14,
        perks: [],
        money: 15
      },
      image_path: '',
      first_name: "Иван",
      last_name: "Иванов",
      company: "Абырвалг инкорпорейтед"
    };
    return this.generateImages();
  };

  gameCtrl.prototype.plus = function(what) {
    var r;
    r = _.find(this.stats.items, {
      id: what
    });
    if (this.current.stats.personality[r.name] < r.max && this.points > 0) {
      this.current.stats.personality[r.name]++;
      this.points--;
    }
  };

  gameCtrl.prototype.minus = function(what) {
    var r;
    r = _.find(this.stats.items, {
      id: what
    });
    if (this.current.stats.personality[r.name] > r.min) {
      this.current.stats.personality[r.name]--;
      this.points++;
    }
  };

  gameCtrl.prototype.toggle = function() {
    return this.showMenu = !this.showMenu;
  };

  gameCtrl.prototype.chooseSpecialty = function(id) {
    this.current.specialties = [
      _.find(this.specialties.items, {
        id: id
      })
    ];
    if (this.current.specialties[0].id === 3) {
      this.current.knowProduct = 5;
    } else {
      this.current.knowProduct = 1;
    }
    if (this.current.specialties[0].id === 5) {
      return this.current.maxCalls = 25;
    } else {
      return this.current.maxCalls = 15;
    }
  };

  gameCtrl.prototype.chooseIndustry = function(id) {
    return this.current.industry = _.find(this.indusrty.items, {
      id: id
    });
  };

  gameCtrl.prototype.chooseAvatar = function(image_path) {
    return this.current.image_path = image_path;
  };

  gameCtrl.prototype.startGame = function(id) {
    return this.$router.navigate([
      'Game', {
        playerAvatarId: id
      }
    ]);
  };

  gameCtrl.prototype.generateImages = function() {
    var i, j, k, len, name, names;
    names = ['manager', 'secretar'];
    this.images = [];
    for (j = 0, len = names.length; j < len; j++) {
      name = names[j];
      for (i = k = 1; k <= 11; i = ++k) {
        this.images.push(name + i + '.png');
      }
    }
    return this.current.image_path = this.images[0];
  };

  gameCtrl.prototype.create = function() {
    var s;
    s = this.cookies.getAll();
    this.current.name = this.current.first_name + this.current.last_name;
    this.current.related_companies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.current.owner = this.localStorage.user.id;
    return this.Restangular.one('api/v1/persons').get().then((function(_this) {
      return function(res) {
        return res.post('', _this.current, '', {
          'X-CSRFToken': s.csrftoken
        }).then(function(res) {
          _this.$router.navigate(['Menu']);
        });
      };
    })(this));
  };

  return gameCtrl;

})();

angular.module('app').component('newgame', {
  template: tpl(),
  controller: ['$localStorage', 'Restangular', '$cookies', gameCtrl],
  controllerAs: 'ctrl',
  bindings: {
    $router: '<'
  }
});

// ---
// generated by coffee-script 1.9.2