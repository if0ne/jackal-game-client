import "./RulePage.css";

//@ts-ignore
import mapLayout from "../../assets/rule_page/map-layout.png";

//@ts-ignore
import cellAirplane from "../../assets/cells/airplane.png";
//@ts-ignore
import cellAmazonka from "../../assets/cells/amazonka.png";
//@ts-ignore
import cellBalloon from "../../assets/cells/balloon.png";
//@ts-ignore
import cellBarrel from "../../assets/cells/barrel.png";
//@ts-ignore
import cellCannibal from "../../assets/cells/cannibal.png";
//@ts-ignore
import cellCannon from "../../assets/cells/cannon.png";
//@ts-ignore
import cellChest5 from "../../assets/cells/chest-5.png";
//@ts-ignore
import cellCroco from "../../assets/cells/crocodile.png";
//@ts-ignore
import cellFortress from "../../assets/cells/fortress.png";
//@ts-ignore
import cellGrass from "../../assets/cells/grass-1.png";
//@ts-ignore
import cellHorse from "../../assets/cells/horse.png";
//@ts-ignore
import cellIce from "../../assets/cells/ice.png";
//@ts-ignore
import cellLabRock from "../../assets/cells/labyrinth-rock.png";
//@ts-ignore
import cellOneArrow from "../../assets/cells/straight-one-way-arrow.png";
//@ts-ignore
import cellTrap from "../../assets/cells/trap.png";

import {ContainerComponent} from "../ContainerComponent";
import {RuleCard} from "./RuleCard";

export const RuleForm = () => {
    return (
        <ContainerComponent className="my-4">
            <h1 id="rule-description">Правила</h1>
            <ContainerComponent className="p-0">
                <h2>Цель игры</h2>
                <p>Найти и перетащить к себе на корабль как можно больше монет, спрятанных на острове. Кто принёс на свой корабль наибольшее число монет, тот и победил.</p>
            </ContainerComponent>
            <ContainerComponent className="p-0">
                <h2>Начало игры</h2>
                <p>В начале игры игровое поле имеет следующий вид:</p>
                <div className="d-flex">
                    <img src={mapLayout} className="mx-auto w-50" alt="Игровое поле"/>
                </div>
            </ContainerComponent>
            <ContainerComponent className="p-0">
                <h2>Ход игрока</h2>
                <p>За один ход производится одно из следующих действий:</p>
                <ol>
                    <li>Корабль (хотя бы с одним пиратом) сдвигается вдоль берега на 1 клетку. Корабль может плавать только вдоль своей стороны острова. Поворачивать за угол он не умеет.</li>
                    <li>Пират сходит с корабля на берег — только на клетку прямо перед кораблём.</li>
                    <li>Пират возвращается на корабль (с добычей или без) с клетки прямо перед кораблём или по диагонали. Для возвращения на корабль также можно воспользоваться другими клетками поля: стрелками, конём, воздушным шаром и др.</li>
                    <li>По суше пират ходит на одну клетку по вертикали, горизонтали или диагонали. Если клетка закрыта (перевернута рубашкой вверх), пират открывает её и выполняет действие, предусмотренное рисунком. Переворачивать не открытую клетку нужно наугад, не заглядывая под рубашку, чтобы например не повернуть стрелку как удобнее. Открывать неизведанные земли пират может только с пустыми руками (без монеты). Пират также может ходить по открытым ранее клеткам, выполняя все указанные на них действия. </li>
                    <li>Пираты могут плавать и выбираться из воды на свой корабль. За ход пират может проплыть одну клетку вдоль берега. Наткнувшись на вражеский корабль, он умирает. Прыгать с берега в море пират не умеет. Выбираться на сушу из воды — тоже. Зато пират может огибать остров вплавь.</li>
                </ol>
                <ul>
                    <li>За ход можно сходить только одним пиратом или кораблём.</li>
                    <li>Пропускать ход нельзя.</li>
                    <li>На одной клетке может находиться несколько пиратов с вашего или дружественного (при игре двое на двое) корабля.</li>
                </ul>

                <h2>Как добывать золото</h2>
                <ol>
                    <li>Каждый уважающий себя пират может тащить на себе только одну монету.</li>
                    <li>Перемещаться с монетой можно только по открытым клеткам.</li>
                    <li>Бить врага с золотишком в руках нельзя. Но если уж очень хочется, можно оставить монету на месте и вперёд, на врага!</li>
                    <li>Если вас, несущего монету, ударил соперник, вы отправляетесь на корабль с пустыми руками, а поклажа остаётся на месте.</li>
                    <li>Плавать с монетой нельзя. Если пират попал в море с монетой, она тонет (выбывает из игры). Пират остаётся на плаву.</li>
                </ol>

                <h2>Как бить врагов</h2>
                <p>Для этого нужно переместиться на клетку, где стоит соперник-пират.</p>
                <ol>
                    <li>При этом последний улетает к себе на корабль, оставив на месте свою поклажу (если таковая имелась), и продолжает игру оттуда. Если врагов на клетке было несколько, все они, побитые переносятся на свои корабли.</li>
                    <li>Бить врага можно только с пустыми руками. Если вы несли монету, можете оставить её на месте и преспокойно стукнуть ничего не подозревающего соперника.</li>
                    <li>Если враг окопался в крепости, то бить его нельзя (на то она и крепость).</li>
                    <li>Если соперник стоит на клетке-вертушке (джунгли, пустыня, болото, горы), ударить его можно только если вы отстаёте на один ход. Например, он на цифре III, вы на цифре II.</li>
                </ol>
            </ContainerComponent>
            <ContainerComponent className="my-4">
                <h1 id="rule-cards">Значение клеток поля</h1>
                <RuleCard name="Пустая клетка" action="Никакое" timing="-" type="Постоянно" canStay="Можно" canGoWithMoney="Можно">
                    <img src={cellGrass} alt="Пустая клетка"/>
                </RuleCard>
                <RuleCard name="Стрелка" action="Переход в любом из указанных направлений" timing="В тот же ход" type="Постоянно" canStay="Нельзя" canGoWithMoney="Можно">
                    <img src={cellOneArrow} alt="Стрелка"/>
                </RuleCard>
                <RuleCard name="Конь" action="Переход буквой «Г»" timing="В тот же ход" type="Постоянно" canStay="Нельзя" canGoWithMoney="Можно">
                    <img src={cellHorse} alt="Конь"/>
                </RuleCard>
                <RuleCard name="Бочонок рома" action="Блокирует следующий ход пирата зашедшего на клетку" timing="В тот же и последующий ход" type="Постоянно" canStay="Можно" canGoWithMoney="Можно">
                    <img src={cellBarrel} alt="Бочонок рома"/>
                </RuleCard>
                <RuleCard name="Лабиринт" action="Обязывает проделать указанное количество ходов для ухода с клетки" timing="В тот же ход и до конца пребывания на клетке" type="Постоянно" canStay="Можно (в том числе пиратам из разных команд)" canGoWithMoney="Можно">
                    <img src={cellLabRock} alt="Лабиринт"/>
                </RuleCard>
                <RuleCard name="Лёд" action="Переход в направлении, в котором был осуществлен переход на клетку" timing="В тот же ход" type="Постоянно" canStay="Нельзя" canGoWithMoney="Можно">
                    <img src={cellIce} alt="Лёд"/>
                </RuleCard>
                <RuleCard name="Ловушка" action="Блокирует ходы попавшего в капкан пирата, пока он не будет освобожден или атакован" timing="В тот же ход и до момента освобождения" type="Постоянно" canStay="Можно" canGoWithMoney="Можно">
                    <img src={cellTrap} alt="Ловушка"/>
                </RuleCard>
                <RuleCard name="Крокодил" action="Возвращает пирата на клетку с которой был осуществлен переход" timing="В тот же ход" type="Постоянно" canStay="Нельзя" canGoWithMoney="Можно">
                    <img src={cellCroco} alt="Крокодил"/>
                </RuleCard>
                <RuleCard name="Людоед" action="Умерщвляет пирата" timing="В тот же ход" type="Постоянно" canStay="Нельзя" canGoWithMoney="Можно">
                    <img src={cellCannibal} alt="Людоед"/>
                </RuleCard>
                <RuleCard name="Крепость" action="Умерщвляет пирата" timing="В тот же ход и до конца пребывания на клетке" type="Постоянно" canStay="Можно" canGoWithMoney="Нельзя">
                    <img src={cellFortress} alt="Крепость"/>
                </RuleCard>
                <RuleCard name="Крепость с аборигенкой" action="Блокирует возможность атаки на пиратов, находящихся на клетке. Дает возможность воскресить убитого пирата" timing="В тот же ход и до конца пребывания на клетке. Воскрешение можно производить со следующего хода, по одному за ход" type="Постоянно" canStay="Можно" canGoWithMoney="Нельзя">
                    <img src={cellAmazonka} alt="Аборигенка"/>
                </RuleCard>
                <RuleCard name="Сундук" action="Обнаруживает указанное количество монет" timing="При открытии" type="При открытии" canStay="Можно" canGoWithMoney="Можно">
                    <img src={cellChest5} alt="Сундук"/>
                </RuleCard>
                <RuleCard name="Воздушный шар" action="Переносит пирата вместе с предметами на корабль" timing="В тот же ход" type="Постоянно" canStay="Нельзя" canGoWithMoney="Можно">
                    <img src={cellBalloon} alt="Воздушный шар"/>
                </RuleCard>
                <RuleCard name="Самолет" action="Переносит пирата вместе с предметами на любую клетку по его выбору" timing="В тот же ход, либо в любой другой" type="При открытии, до момента ухода с клетки любым пиратом" canStay="Можно" canGoWithMoney="Можно">
                    <img src={cellAirplane} alt="Самолет"/>
                </RuleCard>
                <RuleCard name="Пушка" action="Переносит пирата вместе с предметами по направлению дула за границу острова, в море или на корабль" timing="В тот же ход" type="Постоянно" canStay="Нельзя" canGoWithMoney="Можно">
                    <img src={cellCannon} alt="Пушка"/>
                </RuleCard>
            </ContainerComponent>
        </ContainerComponent>
    );
}