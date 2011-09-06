x$(window).on("load", function() {
    window.$ = x$;
    if(!console) {
        window.console = {
            log: function() {}
        };
    }
    if (Touch.isSupported()) { Touch.enable(window.stage); }
    var spd = [4,4];
    var cs = 16;
    function Player(x,y,img) {
        this.spd = spd;
        this.img = img;
        this.x = x;
        this.y = y;
        //this.fdata = {f:0,b:1,r:2,l:3};
        this.fdata = {
            b1:0,
            b2: 1,
            b3: 2,
            r1: 3,
            r2: 4,
            r3: 5,
            f1: 6,
            f2: 7,
            f3: 8,
            l1: 9,
            l2: 10,
            l3: 11
        };
        this.sSheet = new SpriteSheet(this.img, 24, 24,this.fdata);
        this.bs = new BitmapSequence(this.sSheet);
        this.bs.y = this.y;
	    this.bs.x = this.x;
        this.bs.gotoAndStop("b2");
        stage.addChild(this.bs);
        stage.update();
        this.step = 1;
        this.update = function(up,down,left,right,space) {
            if(up) {
                //this.bit.y -= this.spd[1];
                if(this.y>cs/100) {
                    this.y -= this.spd[1];
                }
                //console.log(this.step)
                //this.bs.gotoAndStop("b2");
                this.bs.gotoAndStop("b"+this.step);
                this.step += 1;
                if(this.step>3) {
                    this.step = 1;
                }
            }
            if(down) {
                //this.bit.y += this.spd[1];
                if(this.y<canvas.height-32-cs) {
                    this.y += this.spd[1];
                }
                //this.bs.gotoAndStop("f2");
                this.bs.gotoAndStop("f"+this.step);
                this.step += 1;
                if(this.step>3) {
                    this.step = 1;
                }
            }
            if(right) {
                //this.bit.x += this.spd[0];
                if(this.x<canvas.width-32-cs) {
                    this.x += this.spd[0];
                }
                //this.bs.gotoAndStop("r2");
                this.bs.gotoAndStop("r"+this.step);
                this.step += 1;
                if(this.step>3) {
                    this.step = 1;
                }
            }
            if(left) {
                //this.bit.x -= this.spd[0];
                if(this.x>cs) {
                    this.x -= this.spd[0];
                }
                //this.bs.gotoAndStop("l2");
                this.bs.gotoAndStop("l"+this.step);
                this.step += 1;
                if(this.step>3) {
                    this.step = 1;
                }
            }
            this.bs.x = this.x;
            this.bs.y = this.y;
        };
    }
    var u,d,l,r,s = false;
    var sd = "r";
    $("*").on("keydown", function(e) {
        //e.preventDefault();
        //e.stopPropagation();
        //console.log(e);
        if(e.which===38) {
            e.preventDefault();
            e.stopPropagation();
            u = true;
        } else if(e.which===40) {
            e.preventDefault();
            e.stopPropagation();
            d = true;
        } else if(e.which===37) {
            e.preventDefault();
            e.stopPropagation();
            l = true;
            sd = "l"
        } else if(e.which===39) {
            e.preventDefault();
            e.stopPropagation();
            r = true;
            sd = "r";
        } else if(e.which===32) {
            e.preventDefault();
            e.stopPropagation();
            s = true;
        }
    });
    $("*").on("keyup", function(e) {
        //console.log(e);
        if(e.which===38) {
            e.preventDefault();
            e.stopPropagation();
            u = false;
        } else if(e.which===40) {
            e.preventDefault();
            e.stopPropagation();
            d = false;
        } else if(e.which===37) {
            e.preventDefault();
            e.stopPropagation();
            l = false;
        } else if(e.which===39) {
            e.preventDefault();
            e.stopPropagation();
            r = false;
        } else if(e.which===32) {
            e.preventDefault();
            e.stopPropagation();
            s = false;
        }
    });
    var maxX = 320;
    var maxY = 240;
    function mapLoad(ind) {
        console.log(dungeon);
        //var x,maxX = 0;
        //var y,maxY = 0;
        var x = 0;
        var y = 0;
        //for(var i in dungeon) {
            level = dungeon[ind];
            //console.log(level)
            for(var j in level) {
                var row = level[j];
                for(var k in row) {
                    var col = row[k];
                        //console.log(col=="P");
                        if(col == "P") {
                            //p = Platform(x, y);
                            //platforms.append(p);
                            //entities.add(p);
                            var g = new Graphics();
                            g.beginFill("blue");
                            g.drawRect(x,y,cs,cs);
                            rect = new Shape(g);
                            stage.addChild(rect);
                        }
                        if(col == "S") {
                            //e = ExitBlock(x, y);
                            //platforms.append(e);
                            //entities.add(e);
                            var h = new Graphics();
                            h.beginFill("red");
                            h.drawRect(x,y,cs,cs);
                            rect = new Shape(h);
                            stage.addChild(rect);
                        }
                        /*if(col == "N") {
                            n = NPC(x,y);
                            platforms.append(n);
                            entities.add(n);
                        }*/
                        x += cs;
                        maxX -= cs;
                }
                y += cs;
                maxY -= cs;
                x = 0;
            }
            //console.log(maxX,maxY);
        //}
        stage.update();
    }
    window.tick = function() {
        //alert("Do u lik kittehs?")
        //stage.update();
        if(player) {
            player.update(u,d,l,r,s);
        }
        stage.update();
    };
    function init() {
        //alert("Mudkip!")
        canvas = $("#c")[0];
        window.stage = new Stage(canvas);
        stage.enableMouseOver(10);
        mapLoad(0);
        window.player = null;
        img = new Image();
        img.onload = function(e) {
            //console.log(maxY);
            window.player = new Player(canvas.width/2-16,canvas.height-32-cs,this);
            //window.player = new Player(canvas.width/2-16,maxY);
            Ticker.setFPS(12);
            Ticker.addListener(window);
        };
        img.onerror = function(e) {
            console.log(e);
        };
        img.src = "Graphics/linkSpritesTry1-2.png";
    }
    init();
});