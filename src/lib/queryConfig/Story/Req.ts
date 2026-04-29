// D:\prject\sitenew\src\app\api\story\list\route.ts
export async function getStoryMain() {
    console.log('getStoryMain')
    const res = await fetch(`/api/story/list`,
        {
            method: "GET",

            // credentials: "include", // اگر نیاز به کوکی دارید
        });

    if (!res.ok) {
        throw new Error("خطا در دریافت استوری ها");
    }

    return res.json();
}

