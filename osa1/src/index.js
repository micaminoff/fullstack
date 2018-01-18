import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14
        }
      ]

    return (
        <div>
            <Otsikko otsikko={kurssi} />
            <Sisalto osat={osat} />
            <Yhteensa osat={osat} />
        </div>
    )
}

const Otsikko = (props) => (
    <div>
        <h1>{props.otsikko}</h1>
    </div>
)

const Sisalto = (props) => (
    <div>
        <Osa osa={props.osat[0]} />
        <Osa osa={props.osat[1]} />
        <Osa osa={props.osat[2]} />
    </div>
)

const Osa = (props) => (
    <div>
        <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    </div>
)

const Yhteensa = (props) => (
    <div>
        <p>yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
    </div>
)
ReactDOM.render(
    <App />,
    document.getElementById('root')
)