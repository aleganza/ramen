'use-strict'

import { ANIME } from '@consumet/extensions'

/**
 * Methods to fetch anime video sources and data using Consumet library 
 * 
 * @class
 */
export class AnimeSaturn {
    private consumet

    /**
     * @constructor
     */
    constructor() {
        this.consumet = new ANIME.AnimeSaturn
    }

    /**
     * Gets the episode url and isM3U8 flag
     * 
     * @param {*} animeSearch 
     * @param {*} episode 
     * @returns episode object (url + isM3U8 flag) in streamtape quality
     * @returns -1 if could not get the animeId or the animeEpisodeId
     */
    async getEpisodeUrl(animeSearch: string, episode: number) {
        const animeId = await this.getAnimeId(animeSearch)
        if (animeId == -1) return -1

        const animeEpisodeId = await this.getAnimeEpisodeId(animeId, episode)
        if(animeEpisodeId === undefined) return -1

        const data = await this.consumet.fetchEpisodeSources(animeEpisodeId)

        return data.sources[1] // [1] is streamtape
    }

    /**
     * Gets the anime id
     * 
     * @param {*} animeSearch 
     * @returns anime id
     * @returns -1 if could not get the animeId
     */
    private async getAnimeId(animeSearch: string) {
        const data = await this.consumet.search(animeSearch)
        
        if (data.results.length !== 0) {
            return data.results[0].id
        } else {
            return -1
        }
    }

    /**
     * Gets the anime episode id
     * 
     * @param {*} animeId 
     * @param {*} episode 
     * @returns anime episode id
     */
    private async getAnimeEpisodeId(animeId: string, episode: number) {
        const data = await this.consumet.fetchAnimeInfo(animeId)
        if(data.episodes !== undefined)
            return data.episodes[episode-1]?.id
    }
}