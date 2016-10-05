/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	angular.module('app', ['restangular', 'ngComponentRouter', 'ui.bootstrap', 'ngStorage', 'ngCookies']).config(function($interpolateProvider) {
	  $interpolateProvider.startSymbol('[[');
	  $interpolateProvider.endSymbol(']]');
	});

	angular.module('app').component('app', {
	  template: '<ng-outlet ></ng-outlet>\n',
	  $routeConfig: [
	    {
	      path: '/',
	      name: 'Menu',
	      component: 'menu'
	    }, {
	      path: '/talk',
	      name: 'Talk',
	      component: 'talk'
	    }, {
	      path: '/tree',
	      name: 'Tree',
	      component: 'tree'
	    }, {
	      path: '/game',
	      name: 'Game',
	      component: 'game'
	    }, {
	      path: '/newgame',
	      name: 'NewGame',
	      component: 'newgame'
	    }, {
	      path: '/company',
	      name: 'Company',
	      component: 'company'
	    }
	  ]
	}).config(function($locationProvider) {
	  return $locationProvider.html5Mode(false);
	}).value('$routerRootComponent', 'app');

	__webpack_require__(1);

	__webpack_require__(9);

	__webpack_require__(13);

	__webpack_require__(18);

	__webpack_require__(20);

	__webpack_require__(24);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var appCtrl, tpl,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	__webpack_require__(2);

	__webpack_require__(3);

	__webpack_require__(4);

	tpl = __webpack_require__(6);

	appCtrl = (function() {
	  function appCtrl(player, NpcFactory, company, Restangular) {
	    this.player = player;
	    this.NpcFactory = NpcFactory;
	    this.company = company;
	    this.Restangular = Restangular;
	    this.writeHistory = bind(this.writeHistory, this);
	    this.isStatus = bind(this.isStatus, this);
	    this.checkForSuccess = bind(this.checkForSuccess, this);
	    this.notTheEnd = bind(this.notTheEnd, this);
	    this.checkColor = bind(this.checkColor, this);
	    this.fillNextArrayOfQuestions = bind(this.fillNextArrayOfQuestions, this);
	    this.findAnswerForQuestion = bind(this.findAnswerForQuestion, this);
	    this.update = bind(this.update, this);
	    this.$routerOnActivate = bind(this.$routerOnActivate, this);
	    this.gameName = "Окно переговоров";
	    this.time = 100;
	    this.history = [];
	    this.result = {
	      end: false,
	      type: ""
	    };
	  }

	  appCtrl.prototype.$routerOnActivate = function(next) {
	    this.player.init();
	    this.npcId = next.params.npcId;
	    this.npc = this.NpcFactory(this.Restangular);
	    this.npc.selectCurrent(this.npcId);
	    return this.update(1);
	  };

	  appCtrl.prototype.update = function(questionId) {
	    console.log(this.npc.current);
	    if (questionId > 1) {
	      this.time -= 30;
	    }
	    this.findAnswerForQuestion(questionId);
	    this.checkForSuccess();
	    this.writeHistory();
	    this.fillNextArrayOfQuestions();
	    this.writeHistory();
	  };

	  appCtrl.prototype.findAnswerForQuestion = function(questionId) {
	    if (questionId) {
	      this.npc.findNode(questionId);
	      this.player.findCurrent(questionId);
	      return this.npc.findCurrent();
	    }
	  };

	  appCtrl.prototype.fillNextArrayOfQuestions = function() {
	    if (this.isStatus('failure')) {
	      this.npc.fail();
	      this.player.fail();
	      this.time = 0;
	    } else if (this.isStatus('success')) {
	      this.npc.succeed();
	      this.player.succeed();
	      this.time = 0;
	    }
	    return this.player.findNode(this.npc.current.id);
	  };

	  appCtrl.prototype.checkColor = function() {
	    var f;
	    f = "";
	    if (this.isStatus('failure')) {
	      f = "failure";
	    }
	    if (this.isStatus('success')) {
	      f = "success";
	    }
	    return f;
	  };

	  appCtrl.prototype.notTheEnd = function() {
	    var r;
	    r = true;
	    if (this.isStatus('failure') || this.isStatus('success')) {
	      r = false;
	    }
	    return r;
	  };

	  appCtrl.prototype.checkForSuccess = function() {
	    if (!this.npc.branch) {
	      this.result.end = true;
	      this.result.type = "failure";
	    }
	    if (this.npc.current) {
	      if ((this.npc.current.type === "failure") || this.time <= 0) {
	        this.result.end = true;
	        this.result.type = "failure";
	      }
	      if (this.npc.current.type === "success") {
	        this.result.end = true;
	        return this.result.type = "success";
	      }
	    }
	  };

	  appCtrl.prototype.isStatus = function(name) {
	    var itIs;
	    itIs = false;
	    if (this.result.type === name) {
	      itIs = true;
	    }
	    return itIs;
	  };

	  appCtrl.prototype.writeHistory = function() {
	    var inHistory;
	    inHistory = _.find(this.history, {
	      text: this.npc.current.text
	    });
	    if (!inHistory) {
	      this.history.push(this.npc.current);
	    }
	    inHistory = _.find(this.history, {
	      text: this.player.current.text
	    });
	    if (!inHistory) {
	      return this.history.push(this.player.current);
	    }
	  };

	  return appCtrl;

	})();

	angular.module('app').component('talk', {
	  template: tpl(),
	  controller: ['Player', 'NpcFactory', 'Company', 'Restangular', appCtrl],
	  controllerAs: 'ctrl',
	  bundings: {
	    $router: '<'
	  }
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Player,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Player = (function() {
	  function Player(Restangular, localStorage) {
	    this.Restangular = Restangular;
	    this.localStorage = localStorage;
	    this.succeed = bind(this.succeed, this);
	    this.fail = bind(this.fail, this);
	    this.choosePlayer = bind(this.choosePlayer, this);
	    this.findCurrent = bind(this.findCurrent, this);
	    this.findNode = bind(this.findNode, this);
	    this.init = bind(this.init, this);
	    this.type = 'player';
	    this.name = "";
	    this.fakeName = "Иван Иванович";
	    this.company = "";
	    this.money = "";
	    this.playerAvatarID = 2;
	    this.position = "";
	    this.nodes = [
	      {
	        id: 1,
	        text: "Добрый день!"
	      }, {
	        id: 2,
	        text: "А можно %LPRNAME%?"
	      }, {
	        id: 3,
	        text: "А с кем я разговариваю?"
	      }, {
	        id: 4,
	        text: "Менеджер по продажам %USERNAME%"
	      }, {
	        id: 5,
	        text: "Это %USERNAME% с очень интересным предложением"
	      }, {
	        id: 6,
	        text: "Эмм...я ошиблся номером!"
	      }, {
	        id: 7,
	        text: "Да, хорошо, давайте запишу электронку"
	      }, {
	        id: 8,
	        text: "Я знаю, вы врете, ни на каком он не совещании, вы просто не хотите меня с ним соединять!"
	      }, {
	        id: 9,
	        text: "Видите ли, мы договаривались с ним созвониться после выставки...а когда он может освободиться?"
	      }, {
	        id: 10,
	        text: "Хорошо, я может быть сам наберу чтобы уточнить о прочтении "
	      }, {
	        id: 11,
	        text: "Это %FAKEUSERNAME% , никак не могу до него дозвониться по сотовому. Соедините пожалуйста"
	      }, {
	        id: 12,
	        text: "Скажите, может кто то другой сможет со мной по этому вопросу переговорить?"
	      }, {
	        id: 13,
	        text: "Скажите, А как можно связаться с %LPRNAME%?"
	      }, {
	        id: 14,
	        text: "Нет, у меня к нему технический вопрос"
	      }, {
	        id: 15,
	        text: "Нет, у меня к нему личный вопрос"
	      }
	    ];
	    this.tree = [
	      {
	        questionId: 1,
	        choices: [2, 3]
	      }, {
	        questionId: 2,
	        choices: [12]
	      }, {
	        questionId: 3,
	        choices: [12]
	      }, {
	        questionId: 4,
	        choices: [4, 5, 6, 11]
	      }, {
	        questionId: 5,
	        choices: [13]
	      }, {
	        questionId: 6,
	        choices: [2]
	      }, {
	        questionId: 7,
	        choices: [13]
	      }, {
	        questionId: 8,
	        choices: [7, 8, 9]
	      }, {
	        questionId: 9,
	        choices: [9, 10]
	      }, {
	        questionId: 15,
	        choices: [7]
	      }, {
	        questionId: 16,
	        choices: [5, 14, 15]
	      }, {
	        questionId: 17,
	        choices: [16]
	      }
	    ];
	  }

	  Player.prototype.init = function() {
	    this.id = this.localStorage.player.id;
	    console.log("initing", this.id);
	    this.Restangular.one('api/v1/persons/', this.id).get().then((function(_this) {
	      return function(res) {
	        console.log(res);
	        return _.extend(_this, res);
	      };
	    })(this));
	  };

	  Player.prototype.findNode = function(questionId) {
	    this.branch = _.find(this.tree, {
	      questionId: questionId
	    });
	    if (this.branch) {
	      this.questionArray = _.filter(this.nodes, (function(_this) {
	        return function(element) {
	          return _.includes(_this.branch.choices, element.id);
	        };
	      })(this));
	      _.forEach(this.questionArray, (function(_this) {
	        return function(element) {
	          var name;
	          if (element.text.indexOf("%USERNAME%")) {
	            name = _this.name;
	            return element.text = _.replace(element.text, '%USERNAME%', name);
	          }
	        };
	      })(this));
	      _.forEach(this.questionArray, (function(_this) {
	        return function(element) {
	          var name;
	          if (element.text.indexOf("%FAKEUSERNAME%")) {
	            name = _this.fakeName;
	            return element.text = _.replace(element.text, '%FAKEUSERNAME%', name);
	          }
	        };
	      })(this));
	      return _.forEach(this.questionArray, (function(_this) {
	        return function(element) {
	          var name;
	          if (element.text.indexOf("%LPRNAME%")) {
	            name = "Михаила Сергеевича";
	            element.text = _.replace(element.text, '%LPRNAME%', name);
	            return _this.fakeName;
	          }
	        };
	      })(this));
	    } else {
	      return this.questionArray = [];
	    }
	  };

	  Player.prototype.findCurrent = function(questionId) {
	    return this.current = _.find(this.nodes, {
	      id: questionId
	    });
	  };

	  Player.prototype.choosePlayer = function(playerAvatarID) {
	    if (playerAvatarID) {
	      return this.playerAvatarID = playerAvatarID;
	    }
	  };

	  Player.prototype.fail = function() {
	    return this.current = {
	      id: null,
	      text: "Эммм..ну до свиданья"
	    };
	  };

	  Player.prototype.succeed = function() {
	    return this.current = {
	      id: null,
	      text: "Да, спасибо большое"
	    };
	  };

	  return Player;

	})();

	angular.module('app').service('Player', ['Restangular', '$localStorage', Player]);

	module.exports = Player;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Company,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Company = (function() {
	  function Company(Restangular, localStorage) {
	    this.Restangular = Restangular;
	    this.localStorage = localStorage;
	    this.selectCurrent = bind(this.selectCurrent, this);
	    this.current = {};
	    this.items = [];
	  }

	  Company.prototype.selectCurrent = function(id) {
	    return this.Restangular.one('api/v1/companies/', id).get().then((function(_this) {
	      return function(res) {
	        _this.current = res;
	      };
	    })(this));
	  };

	  return Company;

	})();

	angular.module('app').service('Company', ['Restangular', '$localStorage', Company]);

	module.exports = Company;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Npc;

	__webpack_require__(2);

	Npc = __webpack_require__(5);

	angular.module('app').factory('Person', [
	  function() {
	    return function(res) {
	      var person;
	      if (res.type === 'player') {
	        person = Player();
	      } else if (res.type === 'npc') {
	        person = new Npc();
	      }
	      return person;
	    };
	  }
	]).factory('NpcFactory', [
	  'Restangular', function() {
	    return function(Restangular) {
	      var r, s;
	      this.Restangular = Restangular;
	      r = new Npc;
	      s = r.initNew(this.Restangular);
	      return s;
	    };
	  }
	]);


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Npc,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Npc = (function() {
	  function Npc(Restangular1) {
	    this.Restangular = Restangular1;
	    this.succeed = bind(this.succeed, this);
	    this.fail = bind(this.fail, this);
	    this.selectNpc = bind(this.selectNpc, this);
	    this.selectCurrent = bind(this.selectCurrent, this);
	    this.findCurrent = bind(this.findCurrent, this);
	    this.findNode = bind(this.findNode, this);
	    this.initNew = bind(this.initNew, this);
	    this.init = bind(this.init, this);
	    this.type = 'npc';
	    this.tree = [
	      {
	        questionId: 1,
	        choices: [1, 5]
	      }, {
	        questionId: 2,
	        choices: [4]
	      }, {
	        questionId: 3,
	        choices: [6]
	      }, {
	        questionId: 4,
	        choices: [8]
	      }, {
	        questionId: 5,
	        choices: [15]
	      }, {
	        questionId: 6,
	        choices: [11]
	      }, {
	        questionId: 7,
	        choices: [9]
	      }, {
	        questionId: 8,
	        choices: [14]
	      }, {
	        questionId: 9,
	        choices: [12]
	      }, {
	        questionId: 10,
	        choices: [10]
	      }, {
	        questionId: 11,
	        choices: [13]
	      }, {
	        questionId: 12,
	        choices: [16]
	      }, {
	        questionId: 13,
	        choices: [16]
	      }, {
	        questionId: 14,
	        choices: [17]
	      }, {
	        questionId: 15,
	        choices: [12]
	      }
	    ];
	    this.nodes = [
	      {
	        id: 1,
	        text: "Да, здравствуйте, чем можем вам помочь?",
	        used: false
	      }, {
	        id: 2,
	        text: "Да отошел он, не знаем когда будет...",
	        used: false
	      }, {
	        id: 3,
	        text: "Да не работают такие у нас...",
	        used: false
	      }, {
	        id: 7,
	        text: "И вам добрый день!",
	        used: false
	      }, {
	        id: 4,
	        text: "А кто его спрашивает?",
	        used: false
	      }, {
	        id: 5,
	        text: "Алло?",
	        used: false
	      }, {
	        id: 6,
	        text: "Меня зовут PERSONNAME",
	        used: false
	      }, {
	        id: 8,
	        text: "Вы знаете, он сейчас находится на совещании, но вы можете оставить информацию о вашей компании у нас на электронной почте",
	        used: false
	      }, {
	        id: 9,
	        text: "%EMAIL%, Можете высысылать на него информацию, и мы с вами свяжемся, если нам будет интересно",
	        used: false
	      }, {
	        id: 10,
	        text: "Нет не надо нас набирать, мы вас сами наберем, до свидания!",
	        used: false,
	        type: "failure"
	      }, {
	        id: 11,
	        text: "Ну тогда всего доброго!",
	        used: false,
	        type: "failure"
	      }, {
	        id: 12,
	        text: "Ну знаете, сегодня скорее всего уже не освободится, но можете позвонить завтра в районе обеда, попробую вас с ним соединить",
	        used: false,
	        type: "failure"
	      }, {
	        id: 13,
	        text: "Да, конечно. Давайте соединю",
	        used: false,
	        type: "success"
	      }, {
	        id: 14,
	        text: "Я извиняюсь, но мне кажется вы не долны сюда больше звонить, всего доброго!",
	        used: false,
	        type: "failure"
	      }, {
	        id: 15,
	        text: "Я могу продиктовать вам электронную почту и вы вышлите на нее ваше предложение",
	        used: false
	      }, {
	        id: 16,
	        text: "А что вам конкретно нужно, вы хотите что то предложить?",
	        used: false
	      }, {
	        id: 17,
	        text: "А он о вас знает, как вас представить?",
	        used: false
	      }
	    ];
	    this.loadedData = [
	      {
	        id: 1,
	        name: "Мария",
	        companyId: 1,
	        positionName: "Секретарь"
	      }, {
	        id: 2,
	        name: "Екатерина",
	        companyId: 2,
	        positionName: "Главный секретарь"
	      }, {
	        id: 3,
	        name: "Василиса",
	        companyId: 3,
	        positionName: "Помощник директора"
	      }, {
	        id: 4,
	        name: "Лейла",
	        companyId: 4,
	        positionName: "Менеджер"
	      }, {
	        id: 5,
	        name: "Елена",
	        companyId: 5,
	        positionName: "Секретарь"
	      }, {
	        id: 6,
	        name: "Анна",
	        companyId: 6,
	        positionName: "Секретарь"
	      }, {
	        id: 7,
	        name: "Галина",
	        companyId: 7,
	        positionName: "Помощник директора"
	      }, {
	        id: 8,
	        name: "Ольга",
	        companyId: 8,
	        positionName: "Менеджер"
	      }, {
	        id: 9,
	        name: "Зарина",
	        companyId: 9,
	        positionName: "Помощник директора"
	      }, {
	        id: 10,
	        name: "Гюйра",
	        companyId: 10,
	        positionName: "Секретарь"
	      }, {
	        id: 11,
	        name: "Наталья",
	        companyId: 11,
	        positionName: "Помощник директора"
	      }, {
	        id: 12,
	        name: "Оксана",
	        companyId: 12,
	        positionName: "Секретарь"
	      }, {
	        id: 13,
	        name: "Ксения",
	        companyId: 13,
	        positionName: "Менеджер"
	      }
	    ];
	    this.currentNpc = {};
	  }

	  Npc.prototype.init = function(id) {
	    return this.currentNpc = _.find(this.loadedData, (function(_this) {
	      return function(element) {
	        return element.id === _.toInteger(id);
	      };
	    })(this));
	  };

	  Npc.prototype.initNew = function(Restangular) {
	    return new Npc(Restangular);
	  };

	  Npc.prototype.findNode = function(questionId) {
	    return this.branch = _.find(this.tree, {
	      questionId: questionId
	    });
	  };

	  Npc.prototype.findCurrent = function() {
	    var choiceIndex, name;
	    choiceIndex = this.branch.choices[0];
	    this.current = _.find(this.nodes, {
	      id: choiceIndex
	    });
	    if (this.current.text.indexOf("PERSONNAME")) {
	      name = this.currentNpc.name;
	      return this.current.text = _.replace(this.current.text, 'PERSONNAME', name);
	    }
	  };

	  Npc.prototype.selectCurrent = function(id) {
	    return this.Restangular.one('api/v1/npc/', id).get().then((function(_this) {
	      return function(res) {
	        _this.current = res;
	      };
	    })(this));
	  };

	  Npc.prototype.selectNpc = function(id) {
	    return this.currentNpc = _.find(this.loadedData, (function(_this) {
	      return function(element) {
	        return element.id === _.toInteger(id);
	      };
	    })(this));
	  };

	  Npc.prototype.fail = function() {
	    return this.current = {
	      id: null,
	      text: "Извините, Всего доброго! (звук кладущейся трубки)"
	    };
	  };

	  Npc.prototype.succeed = function() {
	    return this.current = {
	      id: null,
	      text: "Давайте соединю"
	    };
	  };

	  return Npc;

	})();

	angular.module('app').service('Npc', ['Restangular', Npc]);

	module.exports = Npc;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(7);

	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"centered\"\u003E\u003Ch3\u003E[[ctrl.gameName]]\u003C\u002Fh3\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"container\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-lg-4\"\u003E\u003Cdiv class=\"panel panel-default\" style=\"background-color:#C4D9D4\"\u003E\u003Cdiv class=\"panel-body\"\u003E\u003C!--img(src=\"..\u002Fstatic\u002Fmanagers\u002Fimg\u002Fmanager.png\" width=100 height=150)--\u003E\u003Cdiv class=\"media\"\u003E\u003Cdiv class=\"media-left media-middle\"\u003E\u003Cimg ng-src=\"..\u002Fstatic\u002Fmanagers\u002Fimg\u002F[[ctrl.player.image_path]]\" width=\"100\" height=\"150\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"media-body\"\u003E\u003Cul\u003E\u003Cli\u003E[[ctrl.player.name]]\u003C\u002Fli\u003E\u003Cli\u003E\"[[ctrl.player.company]]\"\u003C\u002Fli\u003E\u003Cli\u003E[[ctrl.player.position]]\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"media\"\u003E\u003Cdiv class=\"media-left\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"media-body\"\u003E\u003Ca class=\"btn btn-default btn-lg btn-block\" href=\"\u002F#\u002Fgame\"\u003EЗакончить разговор\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C!--p [[ctrl.next.question]]--\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-lg-4\"\u003E\u003Cdiv class=\"panel panel-default\" style=\"background-color:#C4D9D4\"\u003E\u003Cdiv class=\"panel-body\" ng-class=\"ctrl.checkColor()\"\u003E\u003Cp\u003EОставшееся время\u003Cdiv class=\"progress\"\u003E\u003Cdiv class=\"progress-bar progress-bar-info\" role=\"progressbar\" aria-valuenow=\"[[ctrl.time]]\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: [[ctrl.time]]%\"\u003E\u003C!--| [[ctrl.time]]--\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fp\u003E\u003C!--ol--\u003E\u003C!--    li(ng-repeat='item in ctrl.history') -[[item]]--\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-lg-4\"\u003E\u003Cdiv class=\"panel panel-default\" style=\"background-color:#C4D9D4\"\u003E\u003Cdiv class=\"panel-body\"\u003E\u003Cdiv class=\"media\"\u003E\u003Cdiv class=\"media-left media-middle\"\u003E\u003Cimg class=\"media-object\" src=\"..\u002Fstatic\u002Fmanagers\u002Fimg\u002F[[ctrl.npc.current.image_path]]\" width=\"100\" height=\"150\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"media-body\"\u003E\u003Cul\u003E\u003Cli\u003E[[ctrl.npc.current.name]]\u003C\u002Fli\u003E\u003Cli\u003E\"[[ctrl.npc.current.company]]\"\u003C\u002Fli\u003E\u003Cli\u003E[[ctrl.npc.current.position]]\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-lg-6\"\u003E\u003Cdiv class=\"panel panel-default\" ng-show=\"!ctrl.notTheEnd()\"\u003E\u003Cdiv class=\"panel-body\"\u003E\u003Cp\u003E[[ctrl.player.current.text]]\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"panel panel-default\" ng-show=\"ctrl.notTheEnd()\" style=\"background-color:#C4D9D4\"\u003E\u003Cdiv class=\"panel-header\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"panel-body\"\u003E\u003Ch5\u003E\u003Cb\u003EВыберите варианты ответа\u003C\u002Fb\u003E\u003C\u002Fh5\u003E\u003Cdiv class=\"list-group\"\u003E\u003Ca class=\"list-group-item\" href=\"\" ng-repeat=\"element in ctrl.player.questionArray\" ng-click=\"ctrl.update(element.id)\" style=\"background-color:#F8FBF4\"\u003E-&nbsp;[[element.text]]\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-lg-6\"\u003E\u003Cdiv class=\"panel panel-default\" style=\"background-color:#C4D9D4\"\u003E\u003Cdiv class=\"panel-body\"\u003E\u003Cp\u003E[[ctrl.npc.current.text]]\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-lg-12\"\u003E\u003Cdiv class=\"panel panel-default\"\u003E\u003Cdiv class=\"panel-body\"\u003E\u003Cp\u003EИстория разговора\u003C\u002Fp\u003E\u003Col\u003E\u003Cli ng-repeat=\"item in ctrl.history\"\u003E-[[item.text]]\u003C\u002Fli\u003E\u003C\u002Fol\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var pug_has_own_property = Object.prototype.hasOwnProperty;

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	exports.merge = pug_merge;
	function pug_merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = pug_merge(attrs, a[i]);
	    }
	    return attrs;
	  }

	  for (var key in b) {
	    if (key === 'class') {
	      var valA = a[key] || [];
	      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
	    } else if (key === 'style') {
	      var valA = pug_style(a[key]);
	      var valB = pug_style(b[key]);
	      a[key] = valA + (valA && valB && ';') + valB;
	    } else {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Process array, object, or string as a string of classes delimited by a space.
	 *
	 * If `val` is an array, all members of it and its subarrays are counted as
	 * classes. If `escaping` is an array, then whether or not the item in `val` is
	 * escaped depends on the corresponding item in `escaping`. If `escaping` is
	 * not an array, no escaping is done.
	 *
	 * If `val` is an object, all the keys whose value is truthy are counted as
	 * classes. No escaping is done.
	 *
	 * If `val` is a string, it is counted as a class. No escaping is done.
	 *
	 * @param {(Array.<string>|Object.<string, boolean>|string)} val
	 * @param {?Array.<string>} escaping
	 * @return {String}
	 */
	exports.classes = pug_classes;
	function pug_classes_array(val, escaping) {
	  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
	  for (var i = 0; i < val.length; i++) {
	    className = pug_classes(val[i]);
	    if (!className) continue;
	    escapeEnabled && escaping[i] && (className = pug_escape(className));
	    classString = classString + padding + className;
	    padding = ' ';
	  }
	  return classString;
	}
	function pug_classes_object(val) {
	  var classString = '', padding = '';
	  for (var key in val) {
	    if (key && val[key] && pug_has_own_property.call(val, key)) {
	      classString = classString + padding + key;
	      padding = ' ';
	    }
	  }
	  return classString;
	}
	function pug_classes(val, escaping) {
	  if (Array.isArray(val)) {
	    return pug_classes_array(val, escaping);
	  } else if (val && typeof val === 'object') {
	    return pug_classes_object(val);
	  } else {
	    return val || '';
	  }
	}

	/**
	 * Convert object or string to a string of CSS styles delimited by a semicolon.
	 *
	 * @param {(Object.<string, string>|string)} val
	 * @return {String}
	 */

	exports.style = pug_style;
	function pug_style(val) {
	  if (!val) return '';
	  if (typeof val === 'object') {
	    var out = '', delim = '';
	    for (var style in val) {
	      /* istanbul ignore else */
	      if (pug_has_own_property.call(val, style)) {
	        out = out + delim + style + ':' + val[style];
	        delim = ';';
	      }
	    }
	    return out;
	  } else {
	    val = '' + val;
	    if (val[val.length - 1] === ';') return val.slice(0, -1);
	    return val;
	  }
	};

	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = pug_attr;
	function pug_attr(key, val, escaped, terse) {
	  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
	    return '';
	  }
	  if (val === true) {
	    return ' ' + (terse ? key : key + '="' + key + '"');
	  }
	  if (typeof val.toJSON === 'function') {
	    val = val.toJSON();
	  }
	  if (typeof val !== 'string') {
	    val = JSON.stringify(val);
	    if (!escaped && val.indexOf('"') !== -1) {
	      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
	    }
	  }
	  if (escaped) val = pug_escape(val);
	  return ' ' + key + '="' + val + '"';
	};

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} terse whether to use HTML5 terse boolean attributes
	 * @return {String}
	 */
	exports.attrs = pug_attrs;
	function pug_attrs(obj, terse){
	  var attrs = '';

	  for (var key in obj) {
	    if (pug_has_own_property.call(obj, key)) {
	      var val = obj[key];

	      if ('class' === key) {
	        val = pug_classes(val);
	        attrs = pug_attr(key, val, false, terse) + attrs;
	        continue;
	      }
	      if ('style' === key) {
	        val = pug_style(val);
	      }
	      attrs += pug_attr(key, val, false, terse);
	    }
	  }

	  return attrs;
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	var pug_match_html = /["&<>]/;
	exports.escape = pug_escape;
	function pug_escape(_html){
	  var html = '' + _html;
	  var regexResult = pug_match_html.exec(html);
	  if (!regexResult) return _html;

	  var result = '';
	  var i, lastIndex, escape;
	  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
	    switch (html.charCodeAt(i)) {
	      case 34: escape = '&quot;'; break;
	      case 38: escape = '&amp;'; break;
	      case 60: escape = '&lt;'; break;
	      case 62: escape = '&gt;'; break;
	      default: continue;
	    }
	    if (lastIndex !== i) result += html.substring(lastIndex, i);
	    lastIndex = i + 1;
	    result += escape;
	  }
	  if (lastIndex !== i) return result + html.substring(lastIndex, i);
	  else return result;
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the pug in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @param {String} str original source
	 * @api private
	 */

	exports.rethrow = pug_rethrow;
	function pug_rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(8).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    pug_rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Pug') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Npc, Player, modalTpl, tpl, treeCtrl,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Npc = __webpack_require__(5);

	Player = __webpack_require__(2);

	tpl = __webpack_require__(10);

	modalTpl = __webpack_require__(11);

	__webpack_require__(12);

	treeCtrl = (function() {
	  function treeCtrl(uibModal) {
	    this.uibModal = uibModal;
	    this.makeTree = bind(this.makeTree, this);
	    this.openModal = bind(this.openModal, this);
	    this.$onInit = bind(this.$onInit, this);
	    this.npc = new Npc;
	    this.player = new Player;
	    this.tree = [];
	    this.filterQ = false;
	  }

	  treeCtrl.prototype.$onInit = function() {
	    return this.makeTree(this.player);
	  };

	  treeCtrl.prototype.openModal = function() {
	    return this.modal = this.uibModal.open({
	      template: modalTpl(),
	      size: 'md',
	      controller: 'modalCtrl'
	    });
	  };

	  treeCtrl.prototype.makeTree = function(person) {
	    var opponent;
	    if (person) {
	      if (person.type === 'player') {
	        this.treeType = "Редактор ответов для Игрока";
	        opponent = this.npc;
	      } else if (person.type === 'npc') {
	        this.treeType = "Редактор ответов для NPC";
	        opponent = this.player;
	      }
	      this.tree = [];
	      return _.forEach(opponent.nodes, (function(_this) {
	        return function(node) {
	          var nodesArray, qNode;
	          nodesArray = [];
	          qNode = _.find(person.tree, {
	            questionId: node.id
	          });
	          if (qNode && qNode.choices) {
	            node.hasSiblings = true;
	            _.forEach(qNode.choices, function(choice) {
	              var t;
	              t = _.find(person.nodes, {
	                id: choice
	              });
	              return nodesArray.push(t);
	            });
	          }
	          node.answers = nodesArray;
	          return _this.tree.push(node);
	        };
	      })(this));
	    }
	  };

	  return treeCtrl;

	})();

	angular.module('app').component('tree', {
	  template: tpl(),
	  controller: ['$uibModal', treeCtrl],
	  controllerAs: 'ctrl'
	});

	angular.module('app').filter('HasNoAnswer', function() {
	  return function(data, filterQ) {
	    var out;
	    out = data;
	    if (filterQ === true) {
	      out = _.filter(data, (function(_this) {
	        return function(element) {
	          var ret;
	          ret = (element.hasSiblings !== true) && (element.type !== "failure") && (element.type !== "success");
	          return ret;
	        };
	      })(this));
	    }
	    return out;
	  };
	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(7);

	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"centered\"\u003E\u003Ch3\u003EРедактор диалога\u003C\u002Fh3\u003E\u003Ch5\u003E[[ctrl.treeType]]\u003C\u002Fh5\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"container\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cbutton class=\"btn btn-default\" ng-click=\"ctrl.makeTree(ctrl.player)\"\u003EСделать дерево для Игрока\u003C\u002Fbutton\u003E\u003Cbutton class=\"btn btn-default\" ng-click=\"ctrl.makeTree(ctrl.npc)\"\u003EСделать дерево для NPC\u003C\u002Fbutton\u003E\u003Cinput type=\"checkbox\" ng-model=\"ctrl.filterQ\"\u003E\u003Cul ng-repeat=\"question in ctrl.tree | HasNoAnswer: ctrl.filterQ\"\u003E\u003Cli\u003E[[question.id]]. [[question.text]]\u003Cspan class=\"label label-primary\" ng-if=\"question.type\"\u003E[[question.type]]\u003C\u002Fspan\u003E\u003C!--button.btn.btn-warning(ng-click=\"ctrl.openModal()\") Редактировать--\u003E\u003Cul ng-repeat=\"element in question.answers\"\u003E\u003Cli\u003E\u003Ca\u003E[[element.id]]. [[element.text]]\u003Cspan class=\"label label-primary\" ng-if=\"element.type\"\u003E[[element.type]]\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(7);

	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"modal-header\"\u003E\u003Cbutton class=\"close\" ng-click=\"wizard.cancel()\"\u003E\u003Cspan aria-hidden=\"true\"\u003E×\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003Cdiv class=\"modal-title\"\u003E\u003Ch4\u003E\u003Cb\u003EИзменение вариантов ответа\u003C\u002Fb\u003E\u003C\u002Fh4\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"modal-body\"\u003E\u003Cheader\u003EЗдесь показываем вопрос, варианты ответа и даем возможность либо выбрать еще один ответ либо добавить новый\u003C\u002Fheader\u003E\u003C!--form.smart-form(name=\"addEntityForm\" )--\u003E\u003C!--    header Выберитие у кого нашли технику--\u003E\u003C!--    fieldset--\u003E\u003C!--        section--\u003E\u003C!--            label.label Компания*--\u003E\u003C!--            label.input--\u003E\u003C!--                ui-select(--\u003E\u003C!--                ng-model='wizard.service.selected.client'--\u003E\u003C!--                theme = 'select2'--\u003E\u003C!--                sortable='true'--\u003E\u003C!--                title='Выберите период...'--\u003E\u003C!--                on-select=\"$ctrl.service.groups.changeGroup($select.selected.id)\"--\u003E\u003C!--                required--\u003E\u003C!--                )--\u003E\u003C!--                    ui-select-match(placeholder='Клиент') [[$select.selected.name]]--\u003E\u003C!--                    ui-select-choices(--\u003E\u003C!--                    repeat='group in wizard.service.clients.items'--\u003E\u003C!--                    refresh=\"wizard.service.refreshCompanies($select.search)\"--\u003E\u003C!--                    )--\u003E\u003C!--                        span(ng-bind=\"group.name\")--\u003E\u003C!--    header Введите данные о технике--\u003E\u003C!--    fieldset--\u003E\u003C!--        section--\u003E\u003C!--            label.label Выберите Тип техники:--\u003E\u003C!--            label.input--\u003E\u003C!--                ui-select(--\u003E\u003C!--                ng-model='wizard.service.selected.group'--\u003E\u003C!--                search-enabled='false'--\u003E\u003C!--                theme = 'select2'--\u003E\u003C!--                sortable='true'--\u003E\u003C!--                title='Выберите период...'--\u003E\u003C!--                on-select=\"wizard.service.refreshProducts()\"--\u003E\u003C!--                )--\u003E\u003C!--                    ui-select-match(placeholder='Товарная группа') [[$select.selected.name]]--\u003E\u003C!--                    ui-select-choices(repeat='group in wizard.service.groups.items')--\u003E\u003C!--                        \u002F\u002Fspan(ng-bind-html=\"$ctrl.makeSpacing(group.spacing)\")--\u003E\u003C!--                        span(ng-bind=\"group.name\")--\u003E\u003C!--        section--\u003E\u003C!--            label.label Выберите Производителя техники:--\u003E\u003C!--            label.input--\u003E\u003C!--                ui-select(--\u003E\u003C!--                ng-model='wizard.service.selected.producer'--\u003E\u003C!--                search-enabled='false'--\u003E\u003C!--                theme = 'select2'--\u003E\u003C!--                sortable='true'--\u003E\u003C!--                title='Выберите период...'--\u003E\u003C!--                on-select=\"wizard.service.refreshProducts()\"--\u003E\u003C!--                )--\u003E\u003C!--                    ui-select-match(placeholder='Производители') [[$select.selected.name]]--\u003E\u003C!--                    ui-select-choices(--\u003E\u003C!--                    repeat='group in wizard.service.producers.items'--\u003E\u003C!--                    )--\u003E\u003C!--                        span(ng-bind=\"group.name\")--\u003E\u003C!--        section--\u003E\u003C!--            label.label Модель*--\u003E\u003C!--            label.label(ng-show=\"wizard.hasNoModels()\") Нет моделей по вашим условиям!--\u003E\u003C!--            label.input--\u003E\u003C!--                ui-select(--\u003E\u003C!--                ng-model='wizard.service.selected.model'--\u003E\u003C!--                theme = 'select2'--\u003E\u003C!--                sortable='true'--\u003E\u003C!--                title='Выберите период...'--\u003E\u003C!--                on-select=\"$ctrl.service.groups.changeGroup($select.selected.id)\"--\u003E\u003C!--                required--\u003E\u003C!--                )--\u003E\u003C!--                    ui-select-match(placeholder='Модели техники') [[$select.selected.name]]--\u003E\u003C!--                    ui-select-choices(--\u003E\u003C!--                    repeat='model in wizard.service.models.items'--\u003E\u003C!--                    refresh=\"wizard.service.refreshProducts($select.search)\"--\u003E\u003C!--                    )--\u003E\u003C!--                        span(ng-bind=\"model.name\")--\u003E\u003C!--        section--\u003E\u003C!--            label.label Серийный номер*--\u003E\u003C!--            label.input--\u003E\u003C!--                input(type=\"text\" ng-model=\"wizard.service.selected.sn\" name=\"sn\" required )--\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"modal-footer\"\u003E\u003Cbutton class=\"btn\" ng-click=\"wizard.cancel()\"\u003EОтменить\u003C\u002Fbutton\u003E\u003Cbutton class=\"btn\" ng-disabled=\"addEntityForm.$invalid \" ng-click=\"wizard.save()\"\u003EСохранить\u003C\u002Fbutton\u003E\u003C!--ng-disabled=\"!wizard.service.canSave\"--\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 12 */
/***/ function(module, exports) {

	var modalCtrl,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	modalCtrl = (function() {
	  function modalCtrl(uibModalInstance) {
	    this.uibModalInstance = uibModalInstance;
	    this.save = bind(this.save, this);
	    this.cancel = bind(this.cancel, this);
	  }

	  modalCtrl.prototype.cancel = function() {
	    this.uibModalInstance.dismiss(this.event);
	  };

	  modalCtrl.prototype.save = function() {
	    return this.uibModalInstance.close();
	  };

	  return modalCtrl;

	})();

	modalCtrl.$inject = ['$uibModalInstance'];

	angular.module('app').controller('modalCtrl', modalCtrl);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Company, Npc, gameCtrl, tpl,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Npc = __webpack_require__(5);

	Company = __webpack_require__(3);

	tpl = __webpack_require__(14);

	__webpack_require__(15);

	__webpack_require__(17);

	gameCtrl = (function() {
	  function gameCtrl(service) {
	    this.service = service;
	    this.goToCompany = bind(this.goToCompany, this);
	    this.goToTalk = bind(this.goToTalk, this);
	    this.$routerOnActivate = bind(this.$routerOnActivate, this);
	    this.gameName = "Основной экран";
	    this.npc = new Npc;
	    this.company = new Company;
	  }

	  gameCtrl.prototype.$routerOnActivate = function(next) {
	    return this.service.init();
	  };

	  gameCtrl.prototype.goToTalk = function(id) {
	    return this.$router.navigate([
	      'Talk', {
	        npcId: id
	      }
	    ]);
	  };

	  gameCtrl.prototype.goToCompany = function(id) {
	    return this.$router.navigate([
	      'Company', {
	        companyId: id
	      }
	    ]);
	  };

	  return gameCtrl;

	})();

	angular.module('app').component('game', {
	  template: tpl(),
	  controller: ['appService', gameCtrl],
	  controllerAs: 'ctrl',
	  bindings: {
	    $router: '<'
	  }
	});


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(7);

	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"centered\"\u003E\u003Ch3\u003E[[ctrl.service.gameName]]\u003C\u002Fh3\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"container\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-lg-4\"\u003E\u003Cdiv class=\"panel panel-default\" style=\"background-color:#C4D9D4\"\u003E\u003Cplayer-info player=\"ctrl.service.player\"\u003E\u003C\u002Fplayer-info\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"panel panel-default col-lg-8\" style=\"background-color:#C4D9D4\"\u003E\u003Cdiv class=\"panel\" style=\"background-color:#C4D9D4\"\u003E\u003Ch3\u003EСписок организаций\u003C\u002Fh3\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"panel panel-default\" ng-repeat=\"lead in ctrl.service.player.related_companies\" style=\"background-color:#F8FBF4\"\u003E\u003Cdiv class=\"panel-body\"\u003E\u003Cdiv class=\"media\"\u003E\u003Cdiv class=\"media-left media-middle\"\u003E\u003Cimg src=\"..\u002Fstatic\u002Fmanagers\u002Fimg\u002Fbuilding[[lead.id]].png\" width=\"100\" height=\"150\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"media-body\"\u003E\u003Ch1\u003E\u003Ca href=\"\" ng-click=\"ctrl.goToCompany(lead.id)\"\u003E[[lead.name]]\u003C\u002Fa\u003E\u003C\u002Fh1\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-md-6\"\u003E\u003Cp\u003EРазмер компании: [[lead.size]]\u003C\u002Fp\u003E\u003Cp\u003EИстория сделок:\u003Ci class=\"fa fa-dollar\" aria-hidden=\"true\" style=\"color:#A14E71\"\u003E\u003C\u002Fi\u003E\u003C\u002Fp\u003E\u003Ca class=\"btn btn-success\" ng-click=\"ctrl.goToCompany(lead.id)\" style=\"background-color:#40423F\"\u003EИнфо\u003C\u002Fa\u003E\u003Ca class=\"btn btn-success\" ng-click=\"ctrl.goToTalk(lead.id)\" style=\"background-color:#40423F\"\u003EПозвонить\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C!--.col-md-6--\u003E\u003C!--    .media-left.media-middle--\u003E\u003C!--        img(src=\"..\u002Fstatic\u002Fmanagers\u002Fimg\u002Fsecretar[[lead.id]].png\" width=75 height=100)--\u003E\u003C!--        a.btn.btn-success(ng-click=\"ctrl.goToTalk(lead.id)\") Позвонить.media-body--\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Player, playerInfoCtrl, tpl,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Player = __webpack_require__(2);

	tpl = __webpack_require__(16);

	playerInfoCtrl = (function() {
	  function playerInfoCtrl(Restangular) {
	    this.Restangular = Restangular;
	    this.$onInit = bind(this.$onInit, this);
	  }

	  playerInfoCtrl.prototype.$onInit = function() {
	    return console.log(this.player);
	  };

	  return playerInfoCtrl;

	})();

	angular.module('app').component('playerInfo', {
	  template: tpl(),
	  controller: ['Restangular', playerInfoCtrl],
	  controllerAs: 'ctrl',
	  bindings: {
	    player: '<'
	  }
	});


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(7);

	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"panel-body\"\u003E\u003Cdiv class=\"media\"\u003E\u003Cdiv class=\"media-left media-middle\"\u003E\u003Cimg src=\"..\u002F..\u002Fstatic\u002Fmanagers\u002Fimg\u002F[[ctrl.player.image_path]]\" width=\"100\" height=\"150\"\u003E\u003Cbutton class=\"btn btn-success\" style=\"background-color:#40423F\"\u003EПрофиль\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"media-body\"\u003E\u003Cul\u003E\u003Cli\u003E[[ctrl.player.name]]\u003C\u002Fli\u003E\u003Cli\u003E\" [[ctrl.player.company]] \"\u003C\u002Fli\u003E\u003Cli\u003E[[ctrl.player.position]]\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003Cul\u003E\u003Cli\u003E $ [[ctrl.player.stats.money]]\u003C\u002Fli\u003E\u003Cli\u003E\u003Ci class=\"fa fa-phone\" aria-hidden=\"true\"\u003E&nbsp;\u003C\u002Fi\u003E\u003Cspan\u003EЗвонки сегодня\u003C\u002Fspan\u003E\u003Cdiv class=\"progress\"\u003E\u003Cdiv class=\"progress-bar progress-bar-info\" role=\"progressbar\" aria-valuenow=\"[[ctrl.player.stats.calls_done]]\" aria-valuemin=\"0\" aria-valuemax=\"[[ctrl.player.stats.calls_min]]\" style=\"width: 60%\"\u003E\u003Cspan\u003E[[ctrl.player.stats.calls_done]]\u002F[[ctrl.player.stats.calls_min]]\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ci class=\"fa fa-angle-double-up\" aria-hidden=\"true\"\u003E&nbsp;\u003C\u002Fi\u003E\u003Cspan\u003EОпыт\u003C\u002Fspan\u003E\u003Cdiv class=\"progress\"\u003E\u003Cdiv class=\"progress-bar progress-bar-info\" role=\"progressbar\" aria-valuenow=\"[[ctrl.player.stats.exp]]\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 60%\"\u003E\u003Cspan\u003E[[ctrl.player.stats.exp]]\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var appService,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	__webpack_require__(2);

	appService = (function() {
	  function appService(Restangular, player, localStorage) {
	    this.Restangular = Restangular;
	    this.player = player;
	    this.localStorage = localStorage;
	    this.init = bind(this.init, this);
	    this.inited = false;
	  }

	  appService.prototype.init = function() {
	    return this.player.init();
	  };

	  return appService;

	})();

	angular.module('app').service('appService', ['Restangular', 'Player', '$localStorage', appService]);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Company, gameCtrl, tpl,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Company = __webpack_require__(3);

	tpl = __webpack_require__(19);

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
	    console.log(this.localStorage.user.id);
	    s = this.cookies.getAll();
	    this.current.name = this.current.first_name + this.current.last_name;
	    this.current.related_companies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	    this.current.owner = this.localStorage.user.id;
	    return this.Restangular.one('/api/v1/persons/').post('', this.current, '', {
	      'X-CSRFToken': s.csrftoken
	    }).then((function(_this) {
	      return function(res) {
	        console.log(res);
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


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(7);

	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"centered\"\u003E\u003Ch3\u003E[[ctrl.gameName]]\u003C\u002Fh3\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"container\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-lg-12\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-lg-6\"\u003E\u003Cdiv class=\"panel panel-default\" style=\"background-color:#C4D9D4\"\u003E\u003Cdiv class=\"form-horizontal\"\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel class=\"col-sm-3 control-label\"\u003EИмя\u003C\u002Flabel\u003E\u003Cdiv class=\"col-sm-8\"\u003E\u003Cinput class=\"form-control\" type=\"text\" ng-model=\"ctrl.current.first_name\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel class=\"col-sm-3 control-label\"\u003EФамилия\u003C\u002Flabel\u003E\u003Cdiv class=\"col-sm-8\"\u003E\u003Cinput class=\"form-control\" type=\"text\" ng-model=\"ctrl.current.last_name\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel class=\"col-sm-3 control-label\"\u003EНазвание компании\u003C\u002Flabel\u003E\u003Cdiv class=\"col-sm-8\"\u003E\u003Cinput class=\"form-control\" type=\"text\" ng-model=\"ctrl.current.company\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Ch4\u003EОсталось очков - [[ctrl.points]]\u003C\u002Fh4\u003E\u003Cdiv class=\"panel-body\"\u003E\u003Ctable\u003E\u003Ctr ng-repeat=\"element in ctrl.stats.items\"\u003E\u003Ctd\u003E[[element.caption]]\u003C\u002Ftd\u003E\u003Ctd\u003E\u003Cdiv class=\"btn-group\"\u003E\u003Cbutton class=\"btn btn-default\" ng-click=\"ctrl.minus(element.id)\"\u003E-\u003C\u002Fbutton\u003E\u003Cbutton class=\"btn btn-default\"\u003E[[ctrl.current.stats.personality[element.name] ]]\u003C\u002Fbutton\u003E\u003Cbutton class=\"btn btn-default\" ng-click=\"ctrl.plus(element.id)\"\u003E+\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"panel panel-default\" style=\"background-color:#C4D9D4\"\u003E\u003Cdiv class=\"panel-body\"\u003E\u003Ctable\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cdiv class=\"btn-group\"\u003E\u003Cbutton class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"\u003EСпециализация\u003Cspan class=\"caret\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003Cul class=\"dropdown-menu\"\u003E\u003Cli ng-repeat=\"sp in ctrl.specialties.items\"\u003E\u003Ca ng-click=\"ctrl.chooseSpecialty(sp.id)\" href=\"\" tooltip-placement=\"right\" uib-tooltip=\"[[sp.tooltip]]\"\u003E[[sp.caption]]\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd\u003E[[ctrl.current.specialties[0].caption]]\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cdiv class=\"btn-group\"\u003E\u003Cbutton class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"\u003EСектор работы компании\u003Cspan class=\"caret\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003Cul class=\"dropdown-menu\"\u003E\u003Cli ng-repeat=\"element in ctrl.indusrty.items\"\u003E\u003Ca ng-click=\"ctrl.chooseIndustry(element.id)\" href=\"\" tooltip-placement=\"right\" uib-tooltip=\"[[element.tooltip]]\"\u003E[[element.caption]]\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd\u003E[[ctrl.current.industry.caption]]\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-lg-3\"\u003E\u003Cdiv class=\"panel panel-default\" style=\"background-color:#C4D9D4\"\u003E\u003Cdiv class=\"panel-body\"\u003E\u003Ch4\u003E[[ctrl.current.first_name]] [[ctrl.current.last_name]]\u003C\u002Fh4\u003E\u003Cimg src=\"..\u002F..\u002Fstatic\u002Fmanagers\u002Fimg\u002F[[ctrl.current.image_path]]\" width=\"100\" height=\"150\"\u003E\u003Cdiv class=\"btn-group\"\u003E\u003Cbutton class=\"btn btn-default dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"\u003EВыбрать Аватар\u003Cspan class=\"caret\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003Cul class=\"dropdown-menu\"\u003E\u003Ca href=\"\" ng-repeat=\"element in ctrl.images\" style=\"background-color:#F8FBF4\"\u003E\u003Cimg src=\"..\u002Fstatic\u002Fmanagers\u002Fimg\u002F[[element]]\" ng-click=\"ctrl.chooseAvatar(element)\" width=\"50\" height=\"75\"\u003E\u003C\u002Fa\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003Cp\u003E\u003Cul\u003E\u003Cli tooltip-placement=\"left\" uib-tooltip=\"Деньги\"\u003E$: [[ctrl.current.money]]\u003C\u002Fli\u003E\u003Cli tooltip-placement=\"left\" uib-tooltip=\"Влияет на возможность аргументировать возражения по продукту, нормально разговаривать с техническими директорами\"\u003EЗнание продукта: [[ctrl.current.knowProduct]]\u003C\u002Fli\u003E\u003Cli tooltip-placement=\"left\" uib-tooltip=\"Cколько нужно делать мин звонков в день\"\u003Emin Звонков: [[ctrl.current.minCalls]]\u003C\u002Fli\u003E\u003Cli tooltip-placement=\"left\" uib-tooltip=\"Cколько максимум можно сделать звонков\"\u003Emax Звонков:[[ctrl.current.maxCalls]]\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"row\" style=\"height:250px\"\u003E\u003Cdiv class=\"col-lg-4\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-lg-4 btn btn-default btn-lg\"\u003E\u003Ca ng-click=\"ctrl.create()\"\u003E\u003Cspan\u003EСоздать Персонажа\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-lg-4\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var menuCtrl, modalTpl, tpl,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	tpl = __webpack_require__(21);

	modalTpl = __webpack_require__(22);

	__webpack_require__(23);

	menuCtrl = (function() {
	  function menuCtrl(uibModal, Restangular, localStorage) {
	    this.uibModal = uibModal;
	    this.Restangular = Restangular;
	    this.localStorage = localStorage;
	    this.help = bind(this.help, this);
	    this.goToGame = bind(this.goToGame, this);
	    this.$onInit = bind(this.$onInit, this);
	  }

	  menuCtrl.prototype.$onInit = function() {
	    this.Restangular.one('api/v1/my/').get().then((function(_this) {
	      return function(res) {
	        return _this.localStorage.user = {
	          id: res.user_id
	        };
	      };
	    })(this));
	    return this.Restangular.one('api/v1/persons').get().then((function(_this) {
	      return function(res) {
	        _this.players = res;
	      };
	    })(this));
	  };

	  menuCtrl.prototype.goToGame = function(playerId) {
	    this.localStorage.player.id = playerId;
	    return this.$router.navigate(['Game']);
	  };

	  menuCtrl.prototype.help = function() {
	    return this.modal = this.uibModal.open({
	      controller: 'modalCtrl',
	      controllerAs: '$ctrl',
	      template: modalTpl()
	    });
	  };

	  return menuCtrl;

	})();

	angular.module('app').component('menu', {
	  template: tpl(),
	  controller: ['$uibModal', 'Restangular', '$localStorage', menuCtrl],
	  controllerAs: 'ctrl',
	  bindings: {
	    $router: '<'
	  }
	});


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(7);

	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003C!--p Это главное меню. Отсюда можно начать новую игру и продолжить старую--\u003E\u003Cdiv class=\"container\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-sm-8 col-lg-4 col-sm-offset-2 col-lg-offset-4\"\u003E\u003Cdiv class=\"thumbnail\" style=\"background-color:#FFF7EC\"\u003E\u003Cimg class=\"img-responsive\" src=\"..\u002F..\u002Fstatic\u002Fmanagers\u002Fimg\u002Fwinner.jpg\" height=\"250px\" width=\"250px\" align=\"middle\"\u003E\u003Ca class=\"btn btn-default btn-lg btn-block\" href=\"\u002F#\u002Fnewgame\"\u003E Новая игра\u003C\u002Fa\u003E\u003C!--a(href=\"\u002F#\u002Fgame?id=[[ctrl.clientId]]\").btn.btn-default.btn-lg.btn-block  Продолжить Игру--\u003E\u003C!--a(href=\"\u002F#\u002Ftalk\").btn.btn-default.btn-lg.btn-block Тур переговоров--\u003E\u003Ca class=\"btn btn-default btn-lg btn-block\" href=\"\u002F#\u002Ftree\"\u003EРедактор диалогов\u003C\u002Fa\u003E\u003Ca class=\"btn btn-default btn-lg btn-block\" ng-click=\"ctrl.help()\"\u003EПомощь\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"thumbnail\" style=\"background-color:#FFF7EC\"\u003E\u003Ch4 class=\"text-center\"\u003EИграть за:\u003C\u002Fh4\u003E\u003Ca class=\"btn btn-default btn-lg btn-block\" ng-click=\"ctrl.goToGame(player.id)\" ng-repeat=\"player in ctrl.players\"\u003E[[player.name]]\u003Cimg class=\"img-responsive\" src=\"..\u002F..\u002Fstatic\u002Fmanagers\u002Fimg\u002F[[player.image_path]]\" height=\"50px\" width=\"50px\" align=\"middle\"\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm-2 col-lg-4\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C!--li--\u003E\u003C!--    a(href=\"\") Новая игра--\u003E\u003C!--li--\u003E\u003C!--    a(href=\"\") Загрузить--\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(7);

	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"modal-header\"\u003E\u003Cbutton class=\"close\" ng-click=\"$ctrl.cancel()\"\u003E\u003Cspan aria-hidden=\"true\"\u003E×\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003Cdiv class=\"modal-title\"\u003E\u003Ch4\u003EПомощь\u003C\u002Fh4\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"modal-body\"\u003E\u003Cp\u003EЭто игра \"Менеджеры\". Создана для того, чтобы в игровой форме обучить продажам на примерах из жизни.\u003C\u002Fp\u003E\u003Cp\u003EИгра моделирует работу менеджера по активным продажам, в обязанности которого входит обзвон \"холодных\" клиентов, встреча с ними,выявление потребностей, а также последующая продажа.\u003C\u002Fp\u003E\u003Cp\u003EНа данный момент есть возможность пройти один диалог - проход секретаря и выход на ЛПР\u003C\u002Fp\u003E\u003Cp\u003EИгра состоит из несколких разделов. Первый - основной экран, где можно посмотреть доступные для прозвона компании\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"modal-footer\"\u003E\u003Cbutton class=\"btn\" ng-click=\"$ctrl.cancel()\"\u003EЗакрыть\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 23 */
/***/ function(module, exports) {

	var modalCtrl,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	modalCtrl = (function() {
	  function modalCtrl(uibModalInstance) {
	    this.uibModalInstance = uibModalInstance;
	    this.cancel = bind(this.cancel, this);
	  }

	  modalCtrl.prototype.cancel = function() {
	    return this.uibModalInstance.close();
	  };

	  return modalCtrl;

	})();

	angular.module('app').controller('modalCtrl', ['$uibModalInstance', modalCtrl]);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var companyCtrl, tpl,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	__webpack_require__(3);

	tpl = __webpack_require__(25);

	__webpack_require__(17);

	__webpack_require__(26);

	companyCtrl = (function() {
	  function companyCtrl(service, company) {
	    this.service = service;
	    this.company = company;
	    this.goToTalk = bind(this.goToTalk, this);
	    this.$routerOnActivate = bind(this.$routerOnActivate, this);
	    this.gameName = "Экран информации о компании";
	  }

	  companyCtrl.prototype.$routerOnActivate = function(next) {
	    this.company.selectCurrent(next.params.companyId);
	    this.service.init();
	    return console.log(this.company);
	  };

	  companyCtrl.prototype.goToTalk = function(id) {
	    return this.$router.navigate([
	      'Talk', {
	        npcId: id
	      }
	    ]);
	  };

	  return companyCtrl;

	})();

	angular.module('app').component('company', {
	  template: tpl(),
	  controller: ['appService', 'Company', companyCtrl],
	  controllerAs: 'ctrl',
	  bindings: {
	    $router: '<'
	  }
	});


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(7);

	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"centered\"\u003E\u003Ch3\u003E[[ctrl.gameName]]\u003C\u002Fh3\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"container\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-lg-4\"\u003E\u003Cdiv class=\"panel panel-default\" style=\"background-color:#C4D9D4\"\u003E\u003Cplayer-info player=\"ctrl.service.player\"\u003E\u003C\u002Fplayer-info\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-lg-8\"\u003E\u003Cdiv class=\"panel panel-default\" style=\"background-color:#C4D9D4\"\u003E\u003Cdiv class=\"panel-heading\" style=\"background-color:#ffffff\"\u003E\u003Ca href=\"\u002F#\u002Fgame\"\u003EНазад\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"panel-body\"\u003E\u003Cdiv class=\"media\"\u003E\u003Cdiv class=\"media-left media-middle\"\u003E\u003Cimg src=\"..\u002Fstatic\u002Fmanagers\u002Fimg\u002Fbuilding[[ctrl.company.current.id]].png\" width=\"100\" height=\"150\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"media-body\"\u003E\u003Ch1\u003E\u003Ca href=\"\"\u003E[[ctrl.company.current.name]]\u003C\u002Fa\u003E\u003C\u002Fh1\u003E\u003Cdiv class=\"col-md-6\"\u003E\u003Cp\u003EРазмер : [[ctrl.company.current.size]]\u003C\u002Fp\u003E\u003Cp\u003E[[ctrl.company.current.description]]\u003C\u002Fp\u003E\u003Cp\u003EИстория сделок:\u003Ci class=\"fa fa-dollar\" aria-hidden=\"true\" style=\"color:#A14E71\"\u003E\u003C\u002Fi\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Ch5\u003EСотрудники:\u003C\u002Fh5\u003E\u003Cdiv class=\"panel panel-default\" ng-repeat=\"id in ctrl.company.current.npc_set\"\u003E\u003Cnpc-info id=\"id\"\u003E\u003C\u002Fnpc-info\u003E\u003C!--.panel-body(style=\"background-color:#F8FBF4;\")--\u003E\u003C!--    .col-md-6--\u003E\u003C!--        .media-left.media-middle--\u003E\u003C!--            img(src=\"..\u002Fstatic\u002Fmanagers\u002Fimg\u002Fsecretar[[ctrl.company.current.id]].png\" width=75 height=100)--\u003E\u003C!--            a.btn.btn-success(ng-click=\"ctrl.goToTalk(ctrl.company.current.id)\") Позвонить--\u003E\u003C!--        .media-body--\u003E\u003C!----\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var npcInfoCtrl, tpl,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	__webpack_require__(4);

	tpl = __webpack_require__(27);

	npcInfoCtrl = (function() {
	  function npcInfoCtrl(Restangular, NpcFactory) {
	    this.Restangular = Restangular;
	    this.NpcFactory = NpcFactory;
	    this.$onInit = bind(this.$onInit, this);
	  }

	  npcInfoCtrl.prototype.$onInit = function() {
	    console.log(this.id);
	    this.npc = this.NpcFactory(this.Restangular);
	    return this.npc.selectCurrent(this.id);
	  };

	  return npcInfoCtrl;

	})();

	angular.module('app').component('npcInfo', {
	  template: tpl(),
	  controller: ['Restangular', 'NpcFactory', npcInfoCtrl],
	  controllerAs: 'ctrl',
	  bindings: {
	    id: '<'
	  }
	});


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var pug = __webpack_require__(7);

	function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"panel-body\" style=\"background-color:#F8FBF4\"\u003E\u003Cdiv class=\"col-md-6\"\u003E\u003Cdiv class=\"media-left media-middle\"\u003E\u003Cimg src=\"..\u002Fstatic\u002Fmanagers\u002Fimg\u002F[[ctrl.npc.current.image_path]]\" width=\"75\" height=\"100\"\u003E\u003Ca class=\"btn btn-success\" href=\"\u002F#\u002Ftalk?npcId=[[ctrl.npc.current.id]]\"\u003EПозвонить\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"media-body\"\u003E\u003Cp\u003E[[ctrl.npc.current.name]]\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
	module.exports = template;

/***/ }
/******/ ]);