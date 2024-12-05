import pokemonLogo from '../assets/pokemonlogo.svg';
import styled from 'styled-components';
import pokemonBackground from '../assets/background.jpg'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import { ThemeProvider } from '../contexts/theme-context';
import { ThemeTogglerButton } from './theme-toggler-button/theme-toggler-button';
import { Background } from './background/background';


async function getApi(id) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await response.data;
}

const PokemonDetails = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getApi(id);

                const types = data.types.map(type => type.type.name);

                const filteredMoves = data.moves.slice(0, 10);

                const abilitiesUrls = data.abilities.map(ability => ability.ability.url);
                const abilitiesData = await fetchAbilities(abilitiesUrls);

                setPokemon({
                    name: data.name,
                    image: data.sprites.front_default,
                    id: data.id,
                    types: types,
                    moves: filteredMoves.map(move => move.move.name),
                    abilities: abilitiesData,
                    firstTypeColor: getTypeColor(types[0]),
                });

                setLoading(false);
            } catch (error) {
                setError('Algo deu errado');
                setLoading(false);
            };
        };

        if(id) fetchData();
    }, [id])

    // Variável criada para puxar os dados da url de [abilities]. urls = parâmetro para todos os url passados no fetch
    const fetchAbilities = async (urls) => {
        const abilities = await Promise.all(
            urls.map(async (url) => {
                const response = await axios.get(url);
                const abilityData = await response.data;
                const abilityDescriptions = abilityData.flavor_text_entries.filter(text => text.language.name === 'en');

                return {
                    name: abilityData.name,
                    descriptions: abilityDescriptions.map(text => text.flavor_text),
                };
            })
        );

        // Retorna uma atualização da array abilities, que contém todas as habiliades (Nome e descrição).
        return abilities.filter((ability, index, self) => {
            return index === self.findIndex(a => ability.descriptions === a.descriptions);
        });
    };

    if (loading) return <Loading>Carregando..</Loading>;
    if (error) return <div>{error}</div>;

    return (
        <>
        <ThemeProvider>
            <Header>
                <LogoDiv>
                    <LinkDirection to="/">
                        <Logo src={pokemonLogo} alt="Pokemon Logo" />
                    </LinkDirection>
                </LogoDiv>
                <ThemeTogglerButton />
            </Header>
            <Main>
                <Title>Pokemon Info</Title>
                <Container>
                    <PokemonImage className='imagemPokemon'>
                        <Image src={pokemon.image} alt={pokemon.name} />
                    </PokemonImage>
                    <PokemonDescriptions className="descricaoPokemon">
                        <StyledPokemonName color={pokemon.firstTypeColor}>
                            {pokemon.name}
                        </StyledPokemonName>
                        <h3>Pokédex No. {pokemon.id} </h3>
                        <Tipos>
                            <h3>Tipo: </h3>
                            {pokemon.types.map((type, index) => (
                                <PokemonTipo type={type} key={index}>{type}</PokemonTipo>
                            ))}
                        </Tipos>
                        <h3>Moves:</h3>
                        {pokemon.moves.map((move, index) => (
                            <p key={index}>- {move}</p>
                        ))}
                        <h3>Habilidades:</h3>
                        {pokemon.abilities.map((ability, index) => (
                            <AbilitiesInfo key={index}>
                                <p>- {ability.name} </p>
                                <p>- {ability.descriptions[0]}</p>
                            </AbilitiesInfo>
                        ))}

                    </PokemonDescriptions>
                </Container>
                
                <Background />
            </Main>
        </ThemeProvider>
        </>
    )
}

const getTypeColor = (type) => {
    switch (type) {
        case "fire":
            return "#ef8843";
        case "dragon":
            return "orangered";
        case "fairy":
            return "pink";
        case "flying":
            return "#dfba9a";
        case "psychic":
            return "purple";
        case "water":
            return "#3d51ff";
        case "grass":
            return "green";
        case "electric":
            return "yellow";
        case "bug":
            return "brown";
        case "poison":
            return "purple";
        case "fighting":
            return "red";
        default:
            return "gray";
    }
};

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

const LinkDirection = styled(Link)`
    width: fit-content;
`

const Logo = styled.img`
    width: 250px;
    @media (max-width: 400px){
        width: 100px;
    }
`

const Main = styled.main`
    padding: 30px 50px;
    display: flex;
    flex-direction: column;
    background: #29e094;
    @media (max-width: 337px){
        padding: 20px;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 40px;
    @media (max-width: 931px){
        flex-direction: column;
        margin-top: 30px;
        gap: 40px;
    }
`

const Title = styled.h2`
    margin-bottom: 5px;
    text-align: center;
    margin-bottom: 10px;
`

const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`

const PokemonImage = styled.div`
    background-image: url(${pokemonBackground});
    border: 10px solid #a3a6fa;
    outline: 10px solid #f4f19f;
    width: 400px;
    border-radius: 30px;
    height: 100%;
    @media (max-width: 447px){
        width: 100%;
    }
`

const Image = styled.img`
    width: 100%;
`

const StyledPokemonName = styled.h3`
    background-color: ${props => props.color};
    padding: 10px;
    border-radius: 10px;
    font-style: italic;
    color: white;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10px;
`

const Tipos = styled.div`
    display: flex;
    align-items: center;
    @media(max-width:350px){
        flex-direction: column;
    }
`

const PokemonTipo = styled.div`
    background-color: ${props => getTypeColor(props.type)};
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    color: white;
`

const AbilitiesInfo = styled.div`
    background-color: #839d62b3;
    border-radius: 10px;
    margin: 10px 0px;
    padding: 5px 10px;
`

const PokemonDescriptions = styled.div`
    @media (max-width: 931px){
        width: 100%;
    }
`

export { PokemonDetails }