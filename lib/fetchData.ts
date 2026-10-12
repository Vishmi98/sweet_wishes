// import { getHomeData } from "@/modules/home/home.service";
// import { HomeResponseDataType } from "@/modules/home/home.types";
// import { getServiceBySlug } from "@/modules/services/services.service";
// import { ServiceItemDataType } from "@/modules/services/services.types";

// export async function fetchService(slug: string): Promise<ServiceItemDataType | null> {
//     try {
//         const res = await getServiceBySlug({ slug });
//         if (!res.success || !res.service) {
//             return null;
//         }
//         return res.service;
//     } catch (error) {
//         console.error("Error fetching service data:", error);
//         return null;
//     }
// }

// export async function fetchHomeData(): Promise<HomeResponseDataType | null> {
//     try {
//         const res = await getHomeData();
//         // Since getHomeData returns HomeResponseDataType directly, 
//         // check res.success instead of res.data
//         if (!res || !res.success) {
//             return null;
//         }
//         return res;
//     } catch (error) {
//         console.error("Error fetching home data:", error);
//         return null;
//     }
// }