import { FC, FormEvent } from "react";

export const Home: FC = () => {
    async function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const testValue = (event.target as HTMLFormElement).thing.value;
        const invokeValue = await window.Main.invokeValue(testValue);
        console.log({ invokeValue });
    }

    return (
        <div>
            <form onSubmit={submitForm} >
                <input type="text" name="thing" id="thing"></input>
                <button type="submit">submit</button>
            </form>
        </div>
    );
}