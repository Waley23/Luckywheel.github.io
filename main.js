
(() => {
    const $ = document.querySelector.bind(document);

    let timer = 7000;
    let isRotating = false;
    let currentRotate = 0;
    let play=document.getElementById("play");

    const wheel = $('.wheel');
    const btnStart = $('.btn-start');
    const msg = $('.msg');
    

    /*---------- Selamat: ahgvsdhkasjd = 100/100 ----------*/
    const listGift = [
        {
            txtName: 'RP. 1 JUTA',
            percent:  0/100
        },
        {
            txtName: 'RP. 50.000',
            percent:  0/100
        },
        {
            txtName: 'RP. 500.000',
            percent:  0/100
        },
        {
            txtName: 'RP. 25.000',
            percent:  0/100
        },
        {
            txtName: 'RP. 10.000',
            percent:  0/100
        },
        {
            txtName: 'RP. 2,5 JUTA',
            percent:  1000/100
        },
    ];

    const size = listGift.length;
    const rotate = 360 / size;//Selamat
    const skewY = 90 - rotate;//ambil sekarang
    

    const renderItem = () => {
        listGift.forEach((item, index)=> {
            const itemGift = document.createElement('li')

            itemGift.style.transform = `
                rotate(${rotate*index}deg)
                skewY(-${skewY}deg)
            `;

            itemGift.innerHTML =` 
                <p class="text-item ${index % 2 == 0 && 'even'}"
                    style="transform: skewY(${skewY}deg)
                        rotate(${rotate / 2}deg)"
                >
                    <b>${item.txtName}</b>
                </p>
            `;

            wheel.appendChild(itemGift);
        });
    };

    const rotateWheel = (currentRotate, index) => {
        wheel.style.transform = `rotate(${
            currentRotate - index * rotate - rotate / 2
        }deg)`;
    };

    const getGift = randomnumber => {
        let currentPercent = 0;
        let list = [];

        listGift.forEach((item, index) => {
            currentPercent += item.percent;

            randomnumber <= currentPercent &&
                list.push( {
                    ...item,
                    index,
                });

        });

        return list[0];
    };

    const showTxtGift = txt => {
        setTimeout(() => {
            selamat.play();
            swal({
                title: "CONGRATULATIONS!",
                text: `KAMU DAPAT BONUS SALDO : ${txt}`,
                icon: "success",
                button: "Claim Sekarang!" 
              }).then(function() {
                window.location = "https://wa.me/6285780233703?text=Saya dapat Bonus RP.10.000";
            });
        }, timer);
    };
    
    const start = () => {
        isRotating = true;
        msg.innerHTML ='';

        const random = Math.random();
        const gift = getGift(random);

        currentRotate += 360*10;

        rotateWheel(currentRotate, gift.index);
        showTxtGift(gift.txtName);
    };

    btnStart.addEventListener('click', (play) => {
        !isRotating && start();
    });
    


    renderItem();
})();