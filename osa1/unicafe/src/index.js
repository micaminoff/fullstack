import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    listener = (target) => {
        return () => {
            this.setState({
                [target]: this.state[target] + 1
            })
        }
    }

    klikHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1,
        })
    }
    klikNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
        })
    }
    klikHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
        })
    }

    render() {
        const average = () => (this.state.hyva - this.state.huono) / (this.state.hyva + this.state.huono + this.state.neutraali)
        const percentPositive = () => (this.state.hyva / (this.state.hyva + this.state.huono + this.state.neutraali)) * 100
        const hasValues = () => {
            if (this.state.hyva === 0 && this.state.huono === 0 && this.state.neutraali === 0) {
                return (
                    <div>
                        <p>Palautetta ei vielä annettu</p>
                    </div>
                )
            }
            return <Statistics state={this.state} average={average()} positive={percentPositive()} />
        }
        return (

            <div>
                <h1>Anna Palautetta</h1>
                <Button
                    handleClick={this.listener("hyva")}
                    text="Hyvä!" />
                <Button
                    handleClick={this.listener("neutraali")}
                    text="Neutraali" />
                <Button
                    handleClick={this.listener("huono")}
                    text="huono..." />
                <h1>Statistiikka</h1>
                {hasValues()}
            </div >
        )
    }
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({ state, average, positive }) => (
    <div>
        <Statistic text="Hyvä" number={state.hyva} />
        <Statistic text="Neutraali" number={state.neutraali} />
        <Statistic text="Huono" number={state.huono} />
        <Statistic text="Keskiarvo" number={average} />
        <Statistic text="Positiivisia" number={positive + "%"} />
    </div>
)

const Statistic = ({ text, number }) => (
    <div>
        <p>{text}: {number}</p>
    </div>
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
)