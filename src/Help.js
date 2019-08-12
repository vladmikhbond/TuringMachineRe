import React from 'react';


export default class Help extends React.Component
{
    render() {
        if (this.props.open)
           return (
            <pre className='help'>{`Правило имеет вид `}<b>{`sa = nbM`}</b>{`, где
     s - текущее состояние машины
     a - обозреваемый символ
     n - новое состояние машины
     b - новый символ
     M - движение головки: L - влево, R - вправо, пусто - головка на прежнем месте.
     Правило может завершаться словом STOP - остановка машины.

В алфавите символов пустая ячейка обозначается точкой.
Знак равенства не входит в алфавиты символов и состояний.
Комментарий - знак равенства в начале строки.

Начальным состоянием машины считается "текущее состояние" из первого правила.
Пробелы и пустые строки не важны нигде и никогда.

Исходное положение - головка над началом входного слова, например, ...`}
<span className="under-head">{`i`}</span>{`nput....
(правой границей входного слова является пустая ячейка ленты).
Конечное положение - выходное слово слева от головки, например, ...output`}
<span className="under-head">{`a`}</span>{`bc...
(левой границей выходного слова является пустая ячейка ленты).`}
</pre>);
        return null;
    }
}