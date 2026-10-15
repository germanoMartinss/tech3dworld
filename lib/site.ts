export const logo = '/tech3d-logo-transparent.png'

export const contactEmail = 'hello@tech3dworld.com'

const whatsappNumber = '5513978231058'

const whatsappUrl = (message: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

export const whatsappLink = (product: string) => whatsappUrl(`Olá! Tenho interesse no ${product}.`)
export const whatsappContactLink = whatsappUrl('Olá! Gostaria de falar com a Tech3Dworld.')
