import React from "react";
import { Input } from "@/components/ui/input";

const SearchBox = ({ loading = true, setSearch }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Input
                type="text"
                placeholder="Search user"
                disabled={loading}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
        </form>
    );
};

export default SearchBox;
