new Vue({
    el: "#app",
    data: {
        monster: 100,
        player: 100,
        start: false,
        finish: false,
        logs: []
    },
    methods: {
        started: function(){
            this.start = true;
            this.monster    = 100;
            this.player     = 100;
        },
        attach: function(){
            var randoms = Math.ceil(Math.random() * 10);
            this.monster -= randoms;
            this.addLog({ turn: 'player', text: 'Atak yaptın (' + randoms + ')'})
            this.monsterAttach();
        },
        specialAttach: function(){
            var randoms = Math.ceil(Math.random() * 25);
            this.monster -= randoms;
            this.monsterAttach();
            this.addLog({ turn: 'player', text: 'Özel Atak yaptın (' + randoms + ')' })
        },
        healUp: function(){
            var randoms = Math.ceil(Math.random() * 15);
            this.player += randoms;
            this.monsterAttach();
            this.addLog({ turn: 'player', text: 'Can kazandın (' + randoms + ')' })
        },
        monsterAttach: function(){
            var randoms = Math.ceil(Math.random() * 20);
            this.player -= randoms;
            this.addLog({ turn: 'monster', text: 'Canavar atak yaptı (' + randoms + ')' })
        },
        finished: function(){
            this.finish = true;
            if(this.monster < this.player){
                alert('kazanan benim')
                this.you = 0;
            }else if(this.monster === this.player){
                alert('Eşit')
            }else{
                alert('kazanan canavar')
                this.player = 0;
            }
        },
        addLog: function(log){
            this.logs.push(log)
        }
    },
    watch: {
        player : function(value){
            if(value <= 0){
                this.player = 0
                if(confirm('Kaybettin')){
                    this.player = 100
                    this.monster = 100
                    this.logs = []
                }
            }else if(value >= 100){
                this.player = 100
            }
        },
        monster : function(value){
            if(value <= 0){
                this.monster = 0
                if(confirm('Kazandın')){
                    this.monster = 100
                    this.player = 100
                    this.logs = []
                }
            }
        }
    },
    computed: {
        playerProgress : function(){
            return{
                width: this.player + "%"
            }
        },
        monsterProgress : function(){
            return{
                width: this.monster + "%"
            }
        }
    }
});