/** Pokemon Class */
export class Pokemon { 
    /** Id of the Pokemon */
    id: number;
    /** Name of the Pokemon */
    name: string;
    /** Points of life of the Pokemon */
    hp: number;
    /** Points of attack of the Pokemon */
    cp: number;
    /** Picture (as url) of the Pokemon */
    picture: string;
    /** List of type of the Pokemon */
    types: Array<string>;
    /** Date of creation in database of the Pokemon */
    created: Date;

    /** Initialize a new pokemon with a defaut picture url and an empty list of type */
    constructor() {
        this.picture = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/xxx.png';
        this.types = [];
    }
}