import { useEffect } from "react";
import ICONS from "../public/icons.json";
import autoComplete from '@tarekraafat/autocomplete.js';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

export default function Search({ hideHeader }) {

    const Router = useRouter();

    useEffect(() => {
        const autoCompleteJS = new autoComplete({
            selector: "#autoComplete",
            placeHolder: "Search for coin...",
            data: {
                src: Object.keys(ICONS),
                cache: true,
            },
            resultsList: {
                element: (list, data) => {
                    if (!data.results.length) {
                        // Create "No Results" message element
                        const message = document.createElement("div");
                        // Add class to the created element
                        message.setAttribute("class", "no_result");
                        // Add message text content
                        message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                        // Append message element to the results list
                        list.prepend(message);
                    }
                },
                noResults: true,
            },
            resultItem: {
                highlight: true
            },
            events: {
                input: {
                    selection: (event) => {
                        const selection = event.detail.selection.value;
                        autoCompleteJS.input.value = selection;
                    }
                }
            }
        });
    }, [])

    const findCoin = () => {
        const availableCoin = Object.keys(ICONS);
        const selectCoin = document.getElementById('autoComplete').value;
        if (!selectCoin) {
            toast.error("Please enter coin name", { autoClose: 1000, hideProgressBar: true })
            return
        }
        if (!availableCoin.includes(selectCoin)) {
            toast.error("Coin not exists", { autoClose: 1000, hideProgressBar: true })
            return
        }
        Router.push(`/cryptov2/${ICONS[selectCoin]}`)
    }

    return (
        <div className="w3-white w3-margin w3-card w3-round-large">
            {
                !hideHeader &&
                <div className="w3-container w3-padding w3-black">
                    <h4><b>SEAECH</b></h4>
                </div>
            }
            <div className='w3-padding w3-center'>
                <input
                    id="autoComplete"
                    type="search"
                    dir="ltr"
                    spellCheck="false"
                    autoCorrect="off"
                    autoComplete="off"
                    autoCapitalize="off"
                />
                <button className='w3-button w3-gray w3-round-large w3-text-white' onClick={findCoin} style={{ marginLeft: '10px' }}><b>GO</b></button>
            </div>
        </div>
    )
}