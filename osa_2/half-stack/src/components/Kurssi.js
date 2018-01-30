import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>{kurssi.map(kurssi =>
            <div key={kurssi.nimi}>
                <Otsikko otsikko={kurssi.nimi} />
                <Sisalto osat={kurssi.osat} />
            </div>
        )}
        </div>
    )
}

const Otsikko = (props) => (
    <div>
        <h1>{props.otsikko}</h1>
    </div>
)

const Sisalto = (props) => {
    const { osat } = props;
    return (
        <div>
            {osat.map(osa => <Osa key={osa.nimi} osa={osa} />)}
            <p>Yhteensä: {osat.reduce((sum, osat) => sum + osat.tehtavia, 0)}</p>
        </div>
    )
}

const Osa = (props) => (
    <div>
        <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    </div>
)

export default Kurssi