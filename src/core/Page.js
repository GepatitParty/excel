export class Page {
    constructor(params) {
        this.params = params
    }

    getRoot() {
        throw new Error('No getRoot')
    }

    afterRender() {

    }

    destroy() {

    }
}