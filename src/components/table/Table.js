import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template'
// import {$} from '@core/dom'
// import { compilation } from 'webpack';
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.function'
import {isCell} from '@/components/table/table.function'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'
// import {range} from '@core/utils'
import {matrix} from '@/components/table/table.function'
import {nextSelector} from '@/components/table/table.function'
export class Table extends ExcelComponent {
    static className = 'excel__table'
    
    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'] ,
            ...options
        })
    }   

    toHTML() {
        return createTable()
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)

        this.$on('formula:input', (text) => {this.selection.current.text(text)})
        this.$on('formula:done', () => this.selection.current.focus() )
        
        this.$emit('table:select', $cell)
    }
    
    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const target = $target.id(true);
                const current = this.selection.current.id(true)
                const $cells = matrix(target, current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown(event) {
        const keys = ['Tab', 'Enter', 'ArrowLeft', 
        'ArrowRight', 'ArrowDown', 'ArrowUp']

        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault() 
            
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selection.select($next)
            
            this.$emit('table:select', $next)
        }  
    }
    
    onInput(event) {
        this.$emit('formula:input', $(event.target).text() )
    }
};

