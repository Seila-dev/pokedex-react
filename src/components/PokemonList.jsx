import pokemonLogo from '../assets/pokemonlogo.svg';
import styled from 'styled-components'
import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ThemeProvider } from '../contexts/theme-context';
import { ThemeTogglerButton } from './theme-toggler-button/theme-toggler-button';
import { Background } from './background/background';
import { Button } from './button/button';


async function getApi(offSet) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=10`);
    return await response.json();
}

async function getPokemonDetails(url) {
    const response = await fetch(url);
    return await response.json();
}

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offSet, setOffSet] = useState(0);

    const addNewPokemonsToArray = () => {
        setOffSet(offset => offset + 10);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getApi(offSet);
                const detailedPokemon = await Promise.all(data.results.map(async pokemon => {
                    const details = await getPokemonDetails(pokemon.url);
                    return {
                        name: details.name,
                        image: details.sprites.front_default,
                        id: details.id,
                    };
                }));

                // Código do chat gpt pois sem ele estava renderizando duas vezes a array de pokemons
                setPokemons((prevPokemons) => {
                    const newPokemons = detailedPokemon.filter(
                        (newPokemon) => !prevPokemons.some((pokemon) => pokemon.id === newPokemon.id)
                    );
                    return [...prevPokemons, ...newPokemons];
                });
                setLoading(false);
            } catch (error) {
                setError("Houve um erro inesperado");
                setLoading(false);
            }
        }
        fetchData()

    }, [offSet])

    if (loading) return <Loading>Carregando...</Loading>;
    if (error) return <Loading> {error} </Loading>

    return (
        <ThemeProvider>
            <main>
                <Header>
                    <LogoDiv>
                        <LinkDirection href="#">
                            <Logo src={pokemonLogo} alt="Pokemon Logo" />
                        </LinkDirection>
                    </LogoDiv>
                    <ThemeTogglerButton />
                </Header>

                <Section className='pokemon-list'>
                    <H2>Todos os Pokemóns</H2>
                    <div className="container">
                        <Ul className='pokemon-cards'>
                            {pokemons.map((pokemon, index) => (
                                <Li key={index} className='card'>
                                    <Link to={`/pokemon/${pokemon.id}`}>
                                        <PokemonImage>
                                            <Img src={pokemon.image} alt={pokemon.name} />
                                        </PokemonImage>
                                        <PokemonTitle>
                                            <H3>{pokemon.name}</H3>
                                        </PokemonTitle>
                                    </Link>
                                </Li>
                            ))}
                        </Ul>
                    </div>
                </Section>
                <Button className="bottom-button" onClick={addNewPokemonsToArray}>Mostrar mais pokémons</Button>
                <Background />
            </main>
        </ThemeProvider>
    )
}

const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`

const Header = styled.header`
    display: flex;
    justify-content: center;
    padding: 20px 100px;
    align-items: center;
    @media(max-width: 600px){
        flex-direction: column;
        padding: 20px;
        width:100%;
    }
`

const LogoDiv = styled.div`
    width: 100%;
        @media(max-width: 600px){
        align-items: center;
        justify-content: center;
        display: flex;
        margin-bottom: 20px
    }
`

const LinkDirection = styled.a`
    width: fit-content;
`

const Logo = styled.img`
    width: 250px;
`

const Section = styled.section`
    padding: 80px;
    display: flex;
    flex-direction: column;
`

const H2 = styled.h2`
    margin-bottom: 50px;
    color: #3b4cca;
    text-align: center;
    @media(max-width:390px){
        font-size: 18px;
    }
`

const Ul = styled.ul`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
`

const Li = styled.li`
    background-color: #fff;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.15s ease-in-out;
    &:hover {
        transform: scale(1.05);
    }
`

const Img = styled.img`
    width: 200px;
`

const H3 = styled.h3`
    color: #e9ecef;
`

const PokemonTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #3b4cca;
    border-radius: 0 0 10px 10px;
`

const PokemonImage = styled.div`
    width: 100%;
    padding: 50px 30px;
`

export { PokemonList }