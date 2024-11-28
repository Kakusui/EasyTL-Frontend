--------------------------------------------------------------------------------------------------------------------------------------------------

- [**Preface**](#preface)
- [**Prerequisites**](#prerequisites)
- [**Node Requirements**](#node-requirements)
- [**To build locally (Manual)**](#to-build-locally-manual)
- [**For Production**](#for-production)
  - [**Frontend**](#frontend)
- [**Contributing**](#contributing)
- [**License**](#license)

## **Preface**<a name="preface"></a>
This is the repository for the website of EasyTL (prod website pending). All code is open-source and available for anyone to use. Below is a brief overview of the project, how to build it locally, information regarding production, licensing, and contributing.

If you need to report a security vulnerability, please see the [SECURITY.md](SECURITY.md) file.

--------------------------------------------------------------------------------------------------------------------------------------------------

## **Prerequisites**<a name="prerequisites"></a>
node 20.13.1

npm 10.8.0

## **Node Requirements**<a name="node-requirements"></a>
See `frontend/package.json` for a list of node requirements.

--------------------------------------------------------------------------------------------------------------------------------------------------

## **To build locally (Manual)**<a name="build-locally"></a>

 
1. Clone the repo, make sure you are using the correct branch (currently `main`)
2. Navigate to the `easytl` directory.
3. First install all required packages, these are in `package.json`. Do `npm i`. Then run the dev server with `npm run dev`
4. Website will be on localhost:5173 (frontend).

EasyTL-Frontend uses the backend from https://github.com/Kakusui/kakusui-org. So if you are setting up the backend, please see the instructions there.

## **For Production**<a name="for-production"></a>

### **Frontend**<a name="frontend-1"></a>

Frontend is hosted on cloudflare pages. To deploy, push to the `main` branch.

--------------------------------------------------------------------------------------------------------------------------------------------------

## **Contributing**<a name="contributing"></a>
If you would like to contribute, please open an issue or a pull request. No specific guidelines, but remain professional.

--------------------------------------------------------------------------------------------------------------------------------------------------

## **License**<a name="license"></a>

As Kakusui is an avid supporter of open-source software, this project is licensed under one of the strongest copyleft licenses available, the GNU Affero General Public License (AGPLv3).

You can find the full text of the license in the [LICENSE](License.md) file.

The AGPLv3 is a copyleft license that promotes the principles of open-source software. It ensures that any derivative works based on this project, as well as any software that interacts with users over a network, must also be distributed under the same AGPLv3 license. This license grants you the freedom to use, modify, and distribute the software.

Please note that this information is a brief summary of the AGPLv3. For a detailed understanding of your rights and obligations under this license, please refer to the full license text.