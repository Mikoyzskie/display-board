"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import { ModelSelector } from "@/components/model-selector"
import { PresetSelector } from "@/components/preset-selector"
import { TemperatureSelector } from "@/components/temperature-selector"
import { types } from "@/data/models"
import QRCode from "react-qr-code";
import { models } from "@/data/models"
import { BoardItem, IData, DisplayBoard } from "@/lib/types"
import { useEffect, useState } from "react"

export default function Main({ location }: { location: IData[] }) {

    const [locationSelection, setLocationSelection] = useState()
    const [boardSelection, setBoardSelection] = useState()
    const [boards, setBoards] = useState<DisplayBoard>()

    useEffect(() => {
        if (locationSelection && boardSelection) {
            const boardFilter: IData | undefined = location.find((item) => item.id === locationSelection)
            const boards = boardFilter?.Display_Boards.find((item: DisplayBoard) => item.id === boardSelection)
            if (boards) {
                setBoards(boards)
            }
        }

    }, [boardSelection, locationSelection])


    const locations = location.map((item) => { return { id: item.id, name: item.Location_Name } })

    // .map((item) => { return { id: item.id, name: item.Location_Name } })


    return (
        <div className="hidden h-full flex-col md:flex">
            <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                <Image src="/header.png" alt="Header Logo" width={100} height={50} className="w-auto h-auto" />
                <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                    <PresetSelector presets={locations} setLocation={setLocationSelection} />
                </div>
            </div>
            <Separator />
            <Tabs defaultValue="complete" className="flex-1">
                <div className="container h-full py-6">
                    <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
                        <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                            {
                                locationSelection &&
                                <>
                                    <ModelSelector types={types} models={location} locationId={1} locationAvailability={locationSelection} setBoard={setBoardSelection} />
                                    {/* <TemperatureSelector defaultValue={[1]} /> */}
                                </>
                            }

                        </div>
                        <div className="md:order-1">
                            <TabsContent value="complete" className="mt-0 border-0 p-0">
                                <div className="flex h-full flex-col space-y-4">
                                    <div className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:max-h-[700px] max-w-[1112px] overflow-y-auto grid grid-cols-2 gap-x-[52px] gap-y-[25px] py-[57px] px-[105px] border border-black">

                                        {boards &&
                                            boards.Board_Items.map((item: BoardItem, index: number) => {
                                                return (
                                                    <div key={index} className="w-full h-[184px] bg-white border-[2px] border-black rounded-[6px] text-black p-4 flex items-center gap-6">
                                                        <div className="grow flex flex-col h-full">
                                                            <span className="text-base font-bold uppercase">{item.Board_Items.Parent_Product ? item.Board_Items.Parent_Product.Name : item.Board_Items.Code}</span>
                                                            <br />
                                                            <p className="text-[11px]">{item.Board_Items.Code}</p>

                                                            {
                                                                item.Board_Items.Description ? <p className="text-[11px]">{item.Board_Items.Description}</p> : ""
                                                            }
                                                            {
                                                                item.Board_Items.Item_Finish ? <p className="text-[11px]">Finish: {item.Board_Items.Item_Finish.Finish_ID}</p> : ""
                                                            }
                                                            {
                                                                item.Board_Items.Item_Function ? <p className="text-[11px]">Function: {item.Board_Items.Item_Function.Function}</p> : ""
                                                            }
                                                        </div>
                                                        <div className="w-[100px] flex flex-col items-center justify-center gap-3">
                                                            <QRCode
                                                                value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                                                size={100}
                                                            />
                                                            <span className="text-xs break-words max-w-[100px]">hhttps://cleanuri.com/qX8MyN</span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* <pre>{JSON.stringify(location, null, 2)}</pre> */}

                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button>Download</Button>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    )
}
