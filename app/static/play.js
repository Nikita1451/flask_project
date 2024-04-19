var config = {
    type: Phaser.CANVAS,
    width: 2568,
    height: 1440,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var items = 0;
var img_corp;
var img_shassi;
var img_corp_none;
var img_shassi_none;
var isDraggingImage1 = false;
var is1Complete = false;
var isDraggingImage2 = false;
var is2Complete = false;
var img_wheel;
var img_wheel_none;
var isDraggingImage3;
var is3Complete;
var video;
var flag_of = false;
var put_on = false;

function preload() {
    this.load.image('corp', '/static/Кузов.png');
    this.load.image('shassi', '/static/шасси.png');
    this.load.image("shassi_none", '/static/шасси_тень.png')
    this.load.image("corp_none", '/static/Кузов_тень.png')
    this.load.image("background", '/static/фон.png')
    this.load.audio("set_us", '/static/sound_set.mp3');
    this.load.image("wheel", '/static/колёсные_пары.png');
    this.load.image("wheel_none", '/static/колёсные_пары_тень.png');
    this.load.image("box1", '/static/box.png');
    this.load.image("box2", '/static/box.png');
    this.load.image("box3", '/static/box.png');
    this.load.video("Run_out", '/static/movie/TPL.mp4');
}

function create() {
    var background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.displayWidth = this.sys.game.config.width;
    background.displayHeight = this.sys.game.config.height;
    var sound = this.sound.add("set_us")
    this.add.image(300, 200, "box1").setScale(2.1);
    this.add.image(2560 / 2, 200, "box2").setScale(2.1);
    this.add.image(2560 - 300, 200, "box3").setScale(2.1);
    img_corp = this.add.image(300, 100, 'corp').setScale(0.35).setInteractive();
    img_corp_none = this.add.image(1200, 968, "corp_none").setInteractive();
    img_shassi_none = this.add.image(1200, 968, "shassi_none").setInteractive();
    img_shassi = this.add.image(2560/2, 100, 'shassi').setScale(0.35).setInteractive();
    img_wheel = this.add.image(2560 - 300, 100, "wheel").setScale(0.35).setInteractive();
    img_wheel_none = this.add.image(1200, 968, 'wheel_none').setInteractive();
    video = this.add.video(2568 / 2, 1440/2, "Run_out");
    video.setScale(2568 / video.width, 1440 / video.height);
    video.setVisible(false);

     video.on('complete', function () {
        console.log("Видео закончилось");
        // Выполнение действий или переходы здесь
        window.location.replace("https://yandex.ru");
    });

    img_corp.on('pointerdown', function(pointer) {
    if (items == 2){
            isDraggingImage1 = true;
            put_on = true;}
    });

    img_shassi.on('pointerdown', function(pointer) {
    if (items == 1){
            isDraggingImage2 = true;
            put_on = true;}
    });

    img_wheel.on('pointerdown', function(pointer) {
    if (items == 0){
            isDraggingImage3 = true;}
    });

    this.input.on('pointerup', function(pointer) {
        if (isDraggingImage1 && is1Complete) {
            isDraggingImage1 = false;
            img_corp.x = 1200;
            img_corp.y = 968;
            img_corp.setScale(1);
            img_corp_none.setVisible(false);
            // Запуск звука
            sound.play();
            items++;
        }
        else { isDraggingImage1 = false};
        if (isDraggingImage2 && is2Complete) {
            isDraggingImage2 = false;
            img_shassi.x = 1200;
            img_shassi.y = 968;
            img_shassi.setScale(1);
            img_shassi_none.setVisible(false);
            sound.play();
            // Запуск звука
            items ++;
        }
        else {isDraggingImage2 = false;};
        if (isDraggingImage3 && is3Complete){
            isDraggingImage3 = false;
            img_wheel.x = 1200;
            img_wheel.y = 968;
            img_wheel.setScale(1);
            img_wheel_none.setVisible(false);
            sound.play();
            // Запуск звука
            items ++;
        }
        else {isDraggingImage3 = false;};
    });
}

function update() {
    if (isDraggingImage1) {
        img_corp.x = this.input.activePointer.x;
        img_corp.y = this.input.activePointer.y;
        if (checkOverlap(img_corp, img_corp_none) && items == 2) {
            img_corp_none.setVisible(false);
            is1Complete = true;
            console.log("Пересечение обнаружено");
        } else {
            is1Complete = false;
            img_corp_none.setVisible(true);
        }
    }
    if (isDraggingImage2) {
        img_shassi.x = this.input.activePointer.x;
        img_shassi.y = this.input.activePointer.y;
        if (checkOverlap(img_shassi, img_shassi_none)  && items == 1) {
            img_shassi_none.setVisible(false);
            is2Complete = true;
            console.log("Пересечение обнаружено");
        } else {
            is2Complete = false;
            img_shassi_none.setVisible(true);
        }
    };
    if (isDraggingImage3) {
        img_wheel.x = this.input.activePointer.x;
        img_wheel.y = this.input.activePointer.y;
        if (checkOverlap(img_wheel, img_wheel_none) && items == 0) {
            img_wheel_none.setVisible(false);
            is3Complete = true;
            console.log("Пересечение обнаружено");
        } else {
            is3Complete = false;
            img_wheel_none.setVisible(true);
        }
    }
    if (items == 3 && flag_of == false){
        video.setVisible(true);
         flag_of = true;
        video.play(true);
        setTimeout(function() {
            video.stop("");
            window.location.replace("http://127.0.0.1:5000");
}, 12000);
    }
}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Geom.Rectangle.Intersection(boundsA, boundsB).width > 0;
}
