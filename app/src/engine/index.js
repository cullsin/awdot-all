const whitelist = {
    app: true
}

export const getSubDomain = () => {
    const url = window.location.hostname;
    const regex = new RegExp(/^([a-z]+\:\/{2})?(([\w-]+)\.[\w-]+\.\w+)$/);
    const match = url.match(regex);
    const status = !!url.match(regex);
    return { status, name: match && match[3] };
}

export const isDomainRouter = (options) => {
    if(options.status === true && 
        Boolean(whitelist[options.name]) === false) {
        return true
    } else {
        return false
    }
}
