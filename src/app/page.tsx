import { Metadata } from "next"
import Image from "next/image"
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

import { CodeViewer } from "@/components/code-viewer"
import { MaxLengthSelector } from "@/components/maxlength-selector"
import { ModelSelector } from "@/components/model-selector"
import { PresetActions } from "@/components/preset-actions"
import { PresetSave } from "@/components/preset-save"
import { PresetSelector } from "@/components/preset-selector"
import { PresetShare } from "@/components/preset-share"
import { TemperatureSelector } from "@/components/temperature-selector"
import { TopPSelector } from "@/components/top-p-selector"
import { types } from "@/data/models"
// import { presets } from "@/data/presets"

import { getDisplayBoardLocations } from "@/lib/directus"
import { IData, BoardItem } from "@/lib/types"


import QRCode from "react-qr-code";


export const metadata: Metadata = {
  title: "Display Boards",
  description: "The OpenAI Playground built using the components.",
}

export default async function PlaygroundPage() {

  const data = await getDisplayBoardLocations()

  const result: IData[] = JSON.parse(data)
  // console.log(JSON.stringify(result, null, 2));
  const locations = result.map((item) => { return { id: item.id, name: item.Location_Name } })

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/playground-light.webp"
          width={1280}
          height={916}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/playground-dark.webp"
          width={1280}
          height={916}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          {/* <h2 className="text-lg font-semibold">Playgrounds</h2> */}
          <Image src="/header.png" alt="Header Logo" width={100} height={50} className="w-auto h-auto" />
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={locations} />
            {/* <PresetSave />
            <div className="hidden space-x-2 md:flex">
              <CodeViewer />
              <PresetShare />
            </div> */}
            {/* <PresetActions /> */}
          </div>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <div className="grid gap-2">
                  {/* <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Mode
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[320px] text-sm" side="left">
                      Choose the interface that best suits your task. You can
                      provide: a simple prompt to complete, starting and ending
                      text to insert a completion within, or some text with
                      instructions to edit it.
                    </HoverCardContent>
                  </HoverCard> */}
                  {/* <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="complete">
                      <span className="sr-only">Complete</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <rect
                          x="4"
                          y="3"
                          width="12"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="7"
                          width="12"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="8.5"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="8.5"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="13"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                      </svg>
                    </TabsTrigger>
                    <TabsTrigger value="insert">
                      <span className="sr-only">Insert</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
                          fill="currentColor"
                        ></path>
                        <rect
                          x="4"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="8.5"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="13"
                          y="15"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                      </svg>
                    </TabsTrigger>
                    <TabsTrigger value="edit">
                      <span className="sr-only">Edit</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-5 w-5"
                      >
                        <rect
                          x="4"
                          y="3"
                          width="12"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="7"
                          width="12"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="4"
                          y="15"
                          width="4"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <rect
                          x="8.5"
                          y="11"
                          width="3"
                          height="2"
                          rx="1"
                          fill="currentColor"
                        ></rect>
                        <path
                          d="M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </TabsTrigger>
                  </TabsList> */}
                </div>
                {/* <ModelSelector types={types} models={} data={result} /> */}

                {/* <TemperatureSelector defaultValue={[1]} /> */}
                {/* <MaxLengthSelector defaultValue={[256]} /> */}
                {/* <TopPSelector defaultValue={[0.9]} /> */}
              </div>
              <div className="md:order-1">
                <TabsContent value="complete" className="mt-0 border-0 p-0">
                  <div className="flex h-full flex-col space-y-4">
                    <div className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:max-h-[700px] max-w-[1112px] overflow-y-auto grid grid-cols-2 gap-x-[52px] gap-y-[25px] py-[57px] px-[105px] border border-black">



                      {/* {
                        result[0].Display_Boards[0].Board_Items.map((item: BoardItem, index: number) => {
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
                      } */}

                      {/* <Image
                        src={"/template.jpg"}
                        alt="Template Sampler"
                        width={9999}
                        height={9999}
                        className="w-full h-full"
                      /> */}
                      <pre>{JSON.stringify(result, null, 2)}</pre>
                      {/* <pre>{
                        JSON.stringify(result[0].Display_Boards[0].Board_Name, null, 2)
                      }</pre> */}

                    </div>
                    {/* <Textarea
                      placeholder="Write a tagline for an ice cream shop"
                      className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:max-h-[700px] overflow-y-auto"
                      defaultValue={JSON.stringify(data)}
                    /> */}
                    <div className="flex items-center space-x-2">
                      <Button>Download</Button>
                      {/* <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button> */}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="insert" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                      <Textarea
                        placeholder="We're writing to [inset]. Congrats from OpenAI!"
                        className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                      />
                      <div className="rounded-md border bg-muted"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button>Download</Button>
                      {/* <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button> */}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="edit" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <div className="grid h-full gap-6 lg:grid-cols-2">
                      <div className="flex flex-col space-y-4">
                        <div className="flex flex-1 flex-col space-y-2">
                          <Label htmlFor="input">Input</Label>
                          <Textarea
                            id="input"
                            placeholder="We is going to the market."
                            className="flex-1 lg:min-h-[580px]"
                          />
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Label htmlFor="instructions">Instructions</Label>
                          <Textarea
                            id="instructions"
                            placeholder="Fix the grammar."
                          />
                        </div>
                      </div>
                      <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button>Download</Button>
                      {/* <Button variant="secondary">
                        <span className="sr-only">Show history</span>
                        <CounterClockwiseClockIcon className="h-4 w-4" />
                      </Button> */}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  )
}