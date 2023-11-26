import { NextResponse } from 'next/server';

import * as link from "linkinator";

export async function POST(request: Request) {

    try {
        const req = await request.json();
        const url = req.url;

        const brokenLinks: string[] = [];
        try {
            // create a new `LinkChecker` that we'll use to run the scan.
            const checker = new link.LinkChecker();

            // Respond to the beginning of a new page being scanned
            checker.on('pagestart', url => {
                console.log(`Scanning ${url}`);
            });

            // After a page is scanned, check out the results!
            checker.on('link', result => {
                if (result.state == "BROKEN" || result.status == 404) brokenLinks.push(result.url);
            });

            // Go ahead and start the scan! As events occur, we will see them above.
            const result = await checker.check({
                path: url,
            });

            return NextResponse.json({ brokenLinks }, { status: 200 });
        }
        catch (err) {
            return NextResponse.json({ error: 'Please enter an valid URL' }, { status: 400 });
        }
    }
    catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}