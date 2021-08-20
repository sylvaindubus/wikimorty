import Episode from './episode'

type Character = {
	id: string
	name: string
	image: string
	status: string
	species: string
	gender: string
	location: {
		name: string
	}
	origin: {
		name: string
	}
	episode: Episode[]
}

export default Character
