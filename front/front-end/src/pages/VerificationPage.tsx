import FileUpload from "../components/FileUpload";

const VerficationPage:React.FC = () => {
    function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const file = e.currentTarget.file.files[0];
        const xml = e.currentTarget.file.files[1];
        console.log(file);
        console.log(xml);
    }

    return(
        <>
            <h1>Verification</h1>
            <FileUpload onSubmit={submitHandler} fields={["File to verify", "XML file with neccessary data"]} header="Upload files to verify" />
        </>
    );
}

export default VerficationPage;