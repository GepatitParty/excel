function toButton(button) {
    const meta = `
        data-type="button"
        data-value='${JSON.stringify(button.value)}'
    `

    return `
    <div class="button ${button.action ? 'active' : ''} ${meta}"
      >
        <i class="material-icons" ${meta}>
            ${button.icon}
        </i>
    </div>
    `
}

export function createToolbar(state) {
    let textAlign = state.textAlign
    
    const buttons = [
        {
            icon: 'format_align_left',
            action: state['textAlign'] === 'left',
            value: {textAlign: 'left'},
        },
        { 
            icon: 'format_align_center',
            action: state['textAlign'] === 'center',
            value: {textAlign: state['textAlign'] === 'center' ? 'left' : 'center'},
        },
        {
            icon: 'format_align_right',
            action: state['textAlign'] === 'right',
            value: {textAlign: state['textAlign'] === 'right' ? 'left' :'right'},
        },
        {
            icon: 'format_bold',
            action: state['fontWeight'] === 'bold',
            value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'},
        },
        {
            icon: 'format_italic',
            action: state['fontStyle'] === 'italic',
            value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'},
        },
        {
            icon: 'format_underline',
            action: state['textDecoration'] === 'underline',
            value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'},
        },
    ]

    return buttons.map(toButton).join('')
}