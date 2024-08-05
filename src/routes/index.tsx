import { BsEye, BsX } from "solid-icons/bs";
import { FaRegularEye } from "solid-icons/fa";
import { createEffect, createMemo, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Browser } from "~/components/Browser";
import { Button } from "~/components/Button";

export default function Home() {
    const [tool, setTool] = createSignal<"view" | "hide">("view");

    const [store, setStore] = createStore<BrowserState>({
        hidden: {},
        showHidden: false,
    });

    createEffect(() => {
        setStore("showHidden", tool() != "view");
    });

    const onItemClicked = createMemo(() => {
        if (tool() == "hide") {
            return (item: Item) => {
                console.log(item.fullName);
                setStore("hidden", item.fullName, !store.hidden[item.fullName]);
                console.log(store.hidden[item.fullName]);
            };
        } else {
            return undefined;
        }
    });

    return (
        <div class="flex h-screen justify-center gap-2 overflow-auto bg-slate-200 p-4 text-black">
            <div class="flex max-w-screen-lg flex-1 flex-col items-center gap-2 overflow-auto">
                <h1 class="text-center text-lg font-bold">
                    Trackmania Block Tool
                </h1>

                <div class="flex gap-2 self-stretch">
                    <Browser state={store} onItemClicked={onItemClicked()} />

                    <div class="flex w-48 flex-col items-start gap-1">
                        <Button
                            filled={tool() == "view"}
                            onClick={() => setTool("view")}
                        >
                            <div class="flex items-center gap-1">
                                <BsEye />
                                View
                            </div>
                        </Button>
                        <Button
                            filled={tool() == "hide"}
                            onClick={() => setTool("hide")}
                        >
                            <div class="flex items-center gap-1">
                                <BsX />
                                Hide
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
