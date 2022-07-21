export function generateAllPages(val: any) {
    console.log(val)
    let urls = []
    let sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
        "<urlset\n" +
        "      xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n" +
        "      xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n" +
        "      xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9\n" +
        "            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">"
    Object.keys(val).forEach(key1 => {

        Object.keys(val[key1]).forEach(key2 => {
            sitemap += `<sitemap><loc>https://beit-midrash-hagra.com/${key1}/${key2}</loc><lastmod>${new Date().toISOString()}</lastmod></sitemap>\n`
            if(val[key1][key2].lessons) {
                Object.keys(val[key1][key2].lessons).forEach((lessonPackage: any) => {
                    Object.keys(val[key1][key2].lessons[lessonPackage].values).forEach(lessonId => {
                        const url = `https://beit-midrash-hagra.com/${key1}/${key2}/lessons/${lessonPackage}/${lessonId}`;
                        urls.push(url)
                        sitemap += `<url><loc>${url}</loc><lastmod>${new Date().toISOString()}</lastmod></url>\n`
                    })
                })
            } else {
                Object.keys(val[key1][key2].values || {}).forEach(lessonId => {

                    const url = `https://beit-midrash-hagra.com/${key1}/${key2}/${lessonId}`;
                    urls.push(url)
                    sitemap += `<url><loc>${url}</loc><lastmod>${new Date().toISOString()}</lastmod></url>\n`

                })
            }
        })
    })
    sitemap +="</urlset>"
    // .map(item => item.filter(item => !!item).map(l => Object.keys(l).map(key => l[key]) ))
    console.log(sitemap)
}
