(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            timeout         : options && options.timeout || 10000,
            errorholder     : options && options.errorholder || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZUAAAEVCAMAAAAfNYjRAAAAOVBMVEVHcExmZmZmZmZmZmYzMzNmZmZbW1szMzMzMzNWVlZmZmZmZmZmZmYzMzMzMzMzMzNWVlZmZmYzMzPZYijLAAAAEXRSTlMAU3PtQ5c2wIAbuQrW6GeZsTpogNAAABpRSURBVHja7F3ZkiSnDi0gIALEC///s5c1FxAkubnTvtKDPdNV1VOJkM7Rgvj9/osCTFrhnDBS/UheWF8upeT65Ge8Rpw11ob/MVrEp3Uiw/p6MSf2PPOfMQzCHzXzijGaFvJJUXF9GQu64bMfkns9eL1YcmMPCltsBMJSz1mXcYI1PyG1PIfYzsmt2RiYcXmtZfifCXJiT7mvvdfSYqOjrnBMAd5aDK3nI+K1sIMSqH/Q0STmrMDOwxLJSEzjsRi+5DOrr8iHPYT07TpyZ4/8l+nCjaQ1vS/Yrj9yRCCc6jAC7RwZywNQLwAzIAtD+zKDKIaM5bZ0FtE6NoQiNlIzrep9rGdnreEHqH3NqIxkLoJ0DjrIoeccmJLGGqm3TIBc2G1YsT3P1sV74Is1gLIpqbl5tz4icCTHvNicB3SzhDPSOcuVYmarFkEs7KZ03Q0MQNu6RSmCl9+zaMqHLAQsL2nFG0R3xxcXxTc54k3gyR0HWtl7xJh3X2FdhpCcmxbbt9jFWBilKF/TCu++orN97e2MOQnlddLKW1pRXd+WXwGxS6D5v05AEsmUVkTfIsxYK6txFAWrhYTRwr5kKz/RCzu0kBjwrC6PtHKbg3X5khVjXLFV2mV1edYRB7sj0GfGYHprC+kztS0tLg9IK2/F9oOAJTHjFneWiEWQVu7ZiuonrWS3TCwMytEWEmYJV+6Jdq4POWyEOKrhCYtWCO3viqgsQktj2IFWjIu+r9bKEqZQvHJXqhpVbOdOjap9eiYD4vS1Qqn8B6jxBh5CF6VhXjMmRYld4qYQrUBRBmVcbssO7nUqk6S0Y1crSSEN2i8mUgf9JOdZ2JbGlobUyJfVOOXSaGV5P5WIHwUWXaqIEFhU3xHFgKV5eTERqno9CixrSBlqwH3QhkCNoX55+UXG0XmJB4FlTVWG7T5IyPuwH5qoZPk0hfaPAIv+VZscYv531QpoxRjjjCkNv9LkYquMTHFcmsKVR4HFOg3FG/G85zXjpnQXRbFGsuisavgoJWJGYP8osKy53riy1nGZFCK8KoIYY/OhVtuWkLPNAacjLI8Cy6qVyHKjRoThbOeptIq6atLNCwxZAvtHgWXRCuikFdM7fx8QqGIDRblUtX8MWGClVmucbgTrez1ewz1bIlCK7J8BFvOrw7+w4QfRYPRw+5o/T9V8iiEfEl0OPmxwOgQjowbwUEvZA0t+N1C08pCUI0QbThvWdkSmMrBAE65Q4+SD3BgqoA6hyyjLyAWHfW0mowylWx5yYNKVo0UrqQ2LOwoHdYpY5DZciWG/I7B/xFB8XFiODK8+K2nFjLyeXgFptTPuaPTRA4Zi/ObWLMUaa8dLPIOiRpXeqMCNC8vVFW9tlmbs3I3rRZqRU/B+cWFeKzDUStTCxppSmBJ+SqOPbgorKFCWd0GKwHPHyd/ABzb55vTJZDweqChmucG9ShsLZGNZqpHBQYFzvwMXtqnIhOb+UijjpJY7lrKcBS7GIpcTQ6HAMjp2GqF+nWwROy0XJTFSy1VMcSX/hRhLZMXjw8AmzHJZ8D45tKIjILVcZF/7KWAs7XpISTHIBRY1NLWI93abDJBb70iQf1q8cZhq6+dzdXGTT2glmBKUjtgQruznWXCaFHZeKbyeaqRF4rNpXlg0hIOJLNE0sm2Fgsw+6gyDKSnKPw0q9YSvcmJephY9CUdagaA/SMYSwpXKtGgI5WkxSI7LJKDR1vPlGA4elUrkaizebpqgU9MQyrOkWAAg+F98mMplLTb0QZEcJ2Px4UprWYyC/JNQz1GgSADtfRlSbOwYS2JtXoGiHRrG6czESVPBV9lkRLBYbxFmLBlZrJMX5leSzCyWf0Hm/3utTHR2LcYiHBpyKpoNeoKA9SYU5oE5oBJYHMbnEYpCiOMETrgk8bBZU+mPUYUyYFp5nG84WG43DsI4U0pnBubxyAlcgyAoxJ/UyigZEhAf1uA9mwTjcmlm3Tcdh7RzyBP0zI8Afxrr7RAqrN68T6UropIOcrsx57ue49AQ3u+8sJSmnBI5nHUXCFh8OVz5YURedu+wUm/3b/tfUIzb3LHfu9iLkbFMyYGr1/E6gzDgMypEspiaGemR8fhmiyobyFjmGNjB5tU+WBFZIwC/qRRjuAuvYzCcaNiEHB3xVeniNXvyPjzvziR+WxtN0p2QYSYYeLxksHMTnlYqcGPmWbHSgH1ahEYmJNQkOYQV3TeT6LdUawacI8w4UDK2KwhA0EudkqSDksfSP7CtPGYLWZddNJOmqEEIa4wJrNgYa1fl8M2HdHM3Hp3+molWTI96BRZVFSh51oiPSBarWN6iY3QpCleDxWNV1kjDKmaiFZwDOFtVUyAT3qN7cMMx43AX8XJgT1bmSC5sAuwVSoZFFW0kKmZmmZiKmvHvh7V8Ri7sBNi3Vcjm5k4I1wqXO4anqXG8MNfHLM2Nk3TY+wLY16uoA8EV3kpO96h4xdTXsYywjGSJ7JtTP1URLJ4yMlezJBBVWvUc0Wnvw8ieIymRdRFj/kuqW51cusEiS+H9AQVrVnyDxQFOhNR3u+ug/VcZdewNBNm1pWAV8yX2lRttKGIZS+vhs9NXt+DkMHQlrYywGGFDwvE4MMfK15w/DdM9vWl5qiW+6fmJhA1XB43nFOfqZTCmIe0j+avREUSNv7g6pJUvehJDWvkgF6KhOwNRf5UmXMf0kXwnmiNcGcifFTosUtUhySL/Sis09/CDoEux/Re1QnmwL4IulYjH7v2vtEKZ/O+F9tTk8kGtAA0EH2qlT4WUeHHhLIX2AxkQ1FcHFlC4ck0rDJsbxU9hNBhO4cqzHgw7a4QtJjPQD0p6TlARMR779x6qYOflsShjhNvd8Xl0J8uBVroXPvM55jTMpPXmgxAxHkq3JIiSJCzmLJff4D6sc2hcklbGWmEdB2YxnLBno/TOyAMKV4bS6/dFO05RNBgDd2eYDtWHDzIf8je9mVG/c0Cn8H+AeimG0svdorCCrqV2ZkSn8JQ9aWUovWkhaOwtsOFSR5UStFZAHmwcfjucGmOxN6Drf6QV1BcaQvuDrax+kwpQKEQcaAVvZKZ45Qo1BiwJhmvlKHnSYXNUIB47GI5qRfwe0grDokygsUcXqDFYg/oqQHUF5/8BSYmwMTWeTs4DNksf9MEhPRRCQNNtLFcCFpRGW9TbHWYP8B8bMpZBwPJypYNZFEFoNvuBrcAfbQfyYSc8mH4lwFO8DWQs8bBpivROjgrJsdDVRYPVqjfxO+0niFbKhRUkjbT1j3faTzAqppygdBiOuXUeGP45rQCjywo7iyWbCP4Vb8/RWfx0GwsaNTQODF4KYDzX420xmm7Fw3fw7p7NMINVvAPBKs2G0Y2yBIX4Q1PRYeBnmKB++/dq0dibdoJL0eKIIWMZunVPVK0aFaTUzPpJDx8o5Q1nMparXMhYRlt6ayr5ImKk4KLi3QXKzQQywqsWvXA41u+hve2L7vlqvMe2yJFrxbKNIbhzRk/GfMkNdhso2roKubDaeexyKzmmxwKLOH9ylptJh95rK/OF7OaQm/9/S7X5c/SI1kMgzKCci8O9TQXGgFx2y1Gt0FzQajn2OJsat/ATixCHHpqZQDzkHDlyhWcqejaWAf85reg76QoPvLx2JdCzFa8UFdwYn9G1DreEtJQhKso2fc1X2/P1Rw9WqlvtO81tmmk4PmorLLqv4MYm3GKHUkG6XrrhwVfbKL96LYV1d+hLy1FVvMoG69Iv+1mr61s4ZD05Ak72WuEgXA/zUVxAW4FmCVhLqZRBrn9Irzzwff23RX73xWRo5BQfpNQhBLzB9fGeScXla0w1sGuEdF97BO6M+mIZIISA6nK6ol9FeW3uDXqlKlyrR8ccwQfLACl/dNlYVNciXpsRha7/xbpBzHWD+Fpnf/5Gl42l7zjAvTQ24sGDLDnX/bnMZrFe465dxCH7q/EW5cxaUfq+qaxP/6lu5QXprkLe4BDvW6euEwWOnIvzhUld2QFa5ESb/lTCedMOepEySay7BNSbcJ/4RTyHXJqbrn755RvyG7HB40pZ43LQ14ylc9aHJ3r2xpNmFhH4SUlKXFxTvR5+gQ/VAdQ2BX9tv1UOXYkQ0GcK8M6hxWSCkZ7kpWRoxn/GVOR2Kb7iw4zYgJx2Vxh/ddgqJXSzAb3jwhJcBdcrkzFyd037uwcG/pWgpTL8a8Yid+QtKUKn5XrneFyiYFyGK7wVxLun2e+uqXznxIWugid9aRF3XrAEACYdm3gj6ZKP74H/l7y3BCkuuq9fDaQf6b9szsFdyzzsWx547G8Jd0Kr9sGfcWD5W3MJELKg5uKc/Ice//lUi64x4sq2C11AevuwwU60yTWW2iuwm2raeUUP+fIqRjfZDPhC4gX7Dtd2S7wsfWMtKYiI5ZFtbArxT9K/k594eJWxeJe42qzkDU/RJDM+kHjBNADXQtxQW7RriSstVRPeKZv8jv8hO7F3INSv+fJdnwrC0cSf+evSP55huUgPgYUL0rHF1mL9Z2JRRItkL7N26N9qGCy/5DH+iub9/sFj4lzKuAOU3IpFs5EbY9m9Wy2sfvOXfZZAxOYVXuPGuoygwtqCOT02V4OS52IqFr/06jvXB+EjU4ll2fa5Nx97MG3k0qNItxPbCWHySWC2e3NZFYhL37E+KdKbhTW7TsrFhJZcon50h2NviwVqWMn7Iqx8K94Jhprn1uEPzxN8xlT09mwn+NNBWUT/tbE3q+4nPZCAZtLE51LbHMzR9gZpjCm70wwmVMBsvguqJ1TlOUrej/XGL1eLpPOn/zqQyd9bXcv3JZzft5fxo5ok7PcnG3H5m26/ZPz/dWeQkrE8mUI9ZDZaKb8fk22q/rZUD8QTCeb+ffOr4jdWTzL3iQwTTEQf/2vvOpQcR4GoAyYMBmr4/4+9DmRJ9qQd79Z1V+3ao0Do1xksASiXbw+Kw5n7v/cEvjvt+vhJDXc/seMKQPmBVVzajXz+i5a4PqEsXyvqP+bod0d1/ZmldZza9V98WOX9/cef9QCwvH0L59v7Tw3pBrP7F5+KqN/ff3xdBFdBvu4V9Fxp+66y/JM/1fN/pBwEyf8XC7y4a/n+Y4z0/+oDE/TtTwgTFWWub7cLRL8fV0V9gbT0+qOxx5v8qnUKf8+3VtG4XiGfv+gniLxhEed6kZ9s/2lo9PmCdZU78Rt0Rx8qLJXV7rezvJP7V1SmmpIzPlhk71cP+JBJPHM5CyAvgQjZv0lE0L9fL/JsqdcpDq6Yzak2Lm1eRUteTG5+LgL+Ju4ivuR1dEa3D5HYWL6EbOlK0bOw5zU68tbC5MGGXcoRiL6ERS9wKXfaGOM1RWI1EPO0L4OWNK/y0MLfp7bc61E/qmKc38vSDkYB8uDVX6dhZ9elb9HoxWEv7xj+fRp5js+H8BWr5vn9Xd6S/uvp4/yTnrLnxI1PipDXDv46TYvQ94qKHlERXXkBKufRnBW1OL93H/+HHh4u9DAEu8wBmavZim7HJGP5fb9ymVXnXn7j2PY8yRs6X5DZL3sa+P1ctx6CyasgX6Essyrgz7Tfzm99V7q/i6q8gM7Li588rR7fh1+qSAT2kihsXlc5g/VyPSq7yqaHF9mw+/hwSTfsx3dXeZL362AZt+5duqfXV4mKX5i0XN/vDReMim8X7Rxub5G3C78yPsY1+reL9s6d6QnsZRlMtoC91Ih5d2tY3DVuRnq73SQk/hvS/Bvu2SNTJiry16EjLBASEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhIS+ipZc/RmMpcif5rt6wBcUEdPRg12POPsR94l4OLTq/TYedy5QGV1eO/T1sc5ajPNLRlfu00f4qgqN5jjy/Ux+5jM4WRUtvVT5ThjpbIZrvTKMMX1DDcP54Pd74RPuRCevLUu5rQZ2CINmYaQSkMp9Hnl8JSTuc9w4YjJvQc1jNuuFNtl7rSyyNPQGJFocszhWIamMTiTkUhoHPaSssEPRai0QStiz8L7XEkvLOPrXDC2jUKXSbgigHTKZvtEVQL2a/NIIHCxfI2n+i0XKYwDn3Pukp9XKqIX4HLF0w4TmxEVR4CHHOgTZ+LylvQkP6YeRmOkeJTJ0FED14R8pMCRuqKeHMw40J/2VBspjSKfYY7MVZ/oy4qKKVNWA+MsigjJjYL/ja1SU9stsPGpp8qiDMx24WlEdtEElM7UALSum3Y1WPpgfTQLVT0C2PUMejmDqMQNjsAANVMqHGqqkksHOCLkoc04fFASh3/GfDTjYZLpZAu7iXsaugFAsTdHh2KdGcjsJFCKp+1d0tREymWyKFKqyE0wqXELRBypym85NVqoA22pYr2oY0IuuGIRRmlRobaZzaEV902PIrALxmU7u51HPoAxAfXTtc9i0JCvjrwOq3yOxRpY7BRMuSlypwhcRkUpvN/XP80jC1YmM6Ey+5WEdlRVCVyoCGPkfgG1budOVXI1q/1wplmVeio8tf0avG2YVYW0I1BHoRuZ0pXXoWjLOH+3GI7BujWLnsximu3Jl/G5puPM1RB0RO5ky/wDD+lRxFA4sXdvGlv5gsJvi9/i4VxDZeuASsx7ZHjQafA51fjS7dSvY/MaCVE3sMM3kYx+4YZnGVMfeN59tTps3z31gSibCS7XrJ7e+F27uNkFFdLZ7uCjtWDTMY5MPD5bWAl8Qq465H+kVrnhlCl2Afvk4UOj6TgdoOLM8Yz5rgmVFlKZiQn21A3ZEgZ1VIoD4sHvBUvV/K4yqh+aMKeiVasS+4IyfqNwgU+gdAI3U1rV8wEqJYAEg4bW3uRNDOa5EVdVGrpyYJvgQ6OJMuiUyGQHhTGWRnkAT43odFRs8+OFpadPoHIqDVUou1mu5rvowg4qIbPsFmzUvsXcQeX0yMyy5Vq9cQ4l1AlqRWXw1stgd1Fx9fJUWlgGTI7QkEtHX1s8A2hJIk8a0f5Sw+ypK78SDW1AJe+FE3tCuIcKRcaGjVQsRo5EKVWpsweowAXUIPm08v8+81dU2D8c+WSUfXCWawBFwguSZ1dUgHU9S7FPUanch4gCATCZvX07vg2msStQFlQd+Gh+GcP+POUa8XRowRLaV51CMGpJlos1WFAxwxDUCcNbsLd+KASk2QuU28EBZoVXO+aIyTuRVPL7urJz8VyE4PH1rE01PaApT0OelM/MfiVNud+EStw6Ujyu+BZTnakrfEpsGCAgBWdZ4a5O3MFZg/92vX0qesnBck5usu/7qIAZRwMZUWL4UjJJrs0lDHNzAypKY4TZQ7CdHN2evoHKhvmhoWJqDBJWVEIeMrbVijSNov51mR196IopX+PGpJ+lnVTBO8ogCypsK1wMRacMJeYTKs56uMihy0kEGlwUkI2+yk9pa42MyYEE08ImjrrtbmxmR1RIDnxiedlhdHX2n0eFeGK6NNDfMTdUJgs2BoA658Hdr7pi3bb/cSjoKUNku1YzGV27KqF3Qu4w/yI5FYU6wrGmB3zChAqci8XktzgEQcSEs9QQOfleUQHQ4HxlHNzLalmLJRb1zsy6Ypq4QJMlb03ZbXnrv+BXGqsGcaXOwjEqfcZY3nBHfmUPiv41ochHu83RagZhZlQgRbIRuWttc35gcjoqjkDGAgDyyLWxeGuKsRuSt1VXxqSf5m6WGaTpCKFSZ4zeJR1xoBmMz8VgHZXZgtl0aMFaWE6llOQ/gkrRheLtwd3nALgAy7BV02w3+FRqPWRTOR1HC4tlczPl2TW3r/7f5G1V2K8h2EZXFFdwSpZi8lxKA3vmzJgEwO1diX2oeZzaZK+68f5z+UpHpYlg6OPd9fa9NBGwrqIPUVHsaqF9u8mbfVWclI3rBRRuHYNlrpmayj+VjFVu0jfTUUG7Fkpzj6ZbnK/bq7iMQWPC6KevbwC3fRhYbsDxJLC+HKj3mGcj/z11WFGxj0vb5YbVgg2opFq5K9fUrsj4tjLeTj/leuCebrHMEOWZktDoMvUeu5LvzQ6O+ZpF7hjEARVrVDlu0P2kcCiArSaxQcWheUxGUTI0dOOY6zqPmgCWpMY+qsWm1WsdxD/T4tXTOhh0iksTi0pUVBIHGoNfwRKOil7VID0+RsUfeHv+A/XfWN8tBFV9DUVChmrqaWjYW7WLSo2MPZcuQz7KIcOS5KgaznXWGS60VY8AQQkrc8wjggHn7wta61pDE/fdIvpSwkn7HgbMBdrxAwtG+K+oYLW82bMypG29jUMBN8xmp+LCoW6rQmMsQfd5w8MF9aqoRIyFHqECY0lYxMz5KAdIZdEkTtVJrntlTD80MMJhoY15RbmRa+Fc+YoxW2ktBlqCCtNiw75BG0c1XNhVbYkTAsrlgQUL4bRBBUNQ06sRHBduCuiRhSPlrvs7qNRFp5CqyzRlzYOnGgOHWBGjNvb2MyqhiBH6eeJ2dAfxDVhEpywuwmTPllnZxa84rupYzksQk8HuaMxKdU+doDnLc0NY/Gm0549RGUtV5gAVnH6Nem0Nw3lN0HLpAVdNdbXKtuh5z0dM0YnQgvqEKtcGTGEWLWClEoydtGLLBscopKWUYLL0aEY0OniyoRS1FndU2iA7RWt9JoH/DdwAGBd74PDRwISaCcZx1aKjwlsIsFUw07nXBurKJJdk2M0r0zhazdsUAIYlvjZdPMaFuf3MJRrtu2duK7IJ1VpXcwYnQjHXoByg573dkjh7FXa8G2Qcuq6Rj3kJMbPwiCqBZMnSgIpSp7rq47Dyr0qIa3ZqkKGDRrqpD3djuFRXKlSPOyoThxAaWQjG1Pl1IwzGFU0gQ9srohgCbx6EVn5vi8nDDSAlL/W4Am63ACsXTZUrF72fFiFdnQ8uOUbLalFLkIFDLLXsj3CQDGqs89s+ppjsqa9N8hEs0KtNQXUuHnDzscdMH9sys2Ga+8hFpx9+PbML8fPt+Z1vX7r9I4d5mP+vDWpKnf7X9B/DCYqWjj6quQAAAABJRU5ErkJggg==',
            placeholder     : options && options.placeholder || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                    /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    /* if we found an image we'll load, reset the counter */
                    counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
            settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                appearHanddler(this)
            });

            function appearHanddler (_this) {
                var timer
                if (!_this.loaded) {
                    timer = setTimeout(function () {
                        $self.attr('src', settings.errorholder)
                        tempImg.unbind('load')
                        $self.one("click", function() {
                            $self.attr('src', settings.placeholder)
                            appearHanddler(_this)
                        })
                    }, settings.timeout)

                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    var tempImg = $("<img />")
                        .bind("load", function() {
                            clearTimeout(timer)
                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            }

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
            !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
