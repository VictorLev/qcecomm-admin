import prismadb from "@/lib/prismadb";

import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function PATCH (
    req: Request,
    { params } : { params: {storeId: string, provinceId: string } }
) {
    try {
        const { userId } = auth()
        const body = await req.json();
        
        const { name , valueEn, valueFr, valueSp  } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401})
        }
        if (!name) {
            return new NextResponse("Label is required", { status: 400})
        }
        if (!valueEn) {
            return new NextResponse("Image Url is required", { status: 400})
        }
        if (!params.provinceId) {
            return new NextResponse("province Id is required", { status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403})
        }

        const province =  await prismadb.province.updateMany( {
            where: {
                id: params.provinceId
            },
            data: {
                name,
                valueEn, 
                valueFr, 
                valueSp 
            }
        });

        return NextResponse.json(province)

    } catch (error) {
        console.log('[PROV_PATCH]', error)
        return new NextResponse("Internal error", { status: 500})
    }
    
}

export async function DELETE (
    req: Request,
    { params } : { params: {storeId: string, provinceId: string } }
) {
    try {
        const { userId } = auth()


        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401})
        }
        if (!params.provinceId) {
            return new NextResponse("province Id is required", { status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403})
        }

        const province =  await prismadb.province.deleteMany( {
            where: {
                id: params.provinceId
            }
        });
        return NextResponse.json(province)

    } catch (error) {
        console.log('[PROV_DELETE]', error)
        return new NextResponse("Internal error", { status: 500})
    }
    
}

export async function GET (
    req: Request,
    { params } : { params: { provinceId: string } }
) {
    try {


        if (!params.provinceId) {
            return new NextResponse("province Id is required", { status: 400})
        }

        const province =  await prismadb.province.findUnique( {
            where: {
                id: params.provinceId
            }
        });
        return NextResponse.json(province)

    } catch (error) {
        console.log('[PROV_GET]', error)
        return new NextResponse("Internal error", { status: 500})
    }
    
}