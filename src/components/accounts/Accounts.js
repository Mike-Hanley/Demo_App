import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Account.module.css";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import { ArrowUpward, ArrowBack, ArrowForward } from "@material-ui/icons";


export const Accounts = () => {
  const [error, setError] = useState(false);

  const [allAccounts, setAllAccounts] = useState({
    accounts: [],
  });

  useEffect(() => {
    setError(false);

    const ACCOUNTS_URL = "http://localhost:8080/data";

    const promise = axios.get(ACCOUNTS_URL);

    Promise.all([promise]).then(
      (res) => {
        setAllAccounts({
          accounts: res,
        });
      },
      (err) => {
        if (err) {
          setError(true);
        }
      }
    );
  }, []);

  return (
    <div className="App">
      <h1 className={styles.title}>Accounts</h1>
      <div
        style={{
          height: `${window.innerHeight}px`,
          width: `${window.innerWidth}px`,
          overflowY: "auto",
        }}
      >
        {allAccounts.accounts.length > 0 && (
          <MaterialTable
            columns={[
              {
                title: "Id",
                field: "Id",
                align: "center",
                emptyValue: "N/A",
              },
              {
                title: "Name",
                field: "Name",
                align: "center",
                emptyValue: "N/A",
              },
              {
                title: "Annual Revenue",
                field: "AnnualRevenue",
                type: "numeric",
                align: "center",
                emptyValue: "N/A",
              },
              {
                title: "Website",
                field: "Website",
                align: "center",
                emptyValue: "N/A",
              },
              {
                title: "Account Number",
                field: "AccountNumber",
                align: "center",
                emptyValue: "N/A",
              },
              {
                title: "Rating",
                field: "Rating",
                align: "center",
                emptyValue: "N/A",
              },
              {
                title: "Upsell Opportunity",
                field: "UpsellOpportunity__c",
                align: "center",
                emptyValue: "N/A",
              },
              {
                title: "Contacts",
                field: "Contacts.totalSize",
                align: "center",
                emptyValue: "N/A",
                type: "numeric",
              },
            ]}
            data={allAccounts.accounts[0]["data"]["records"]}
            icons={{
              Clear: React.forwardRef((props, ref) => <DeleteIcon ref={ref} />),
              Search: React.forwardRef((props, ref) => (
                <SearchIcon ref={ref} className={styles.search} />
              )),
              ResetSearch: React.forwardRef((props, ref) => (
                <DeleteIcon ref={ref} />
              )),
              SortArrow: React.forwardRef((props, ref) => (
                <ArrowUpward {...props} fontSize="small" ref={ref} />
              )),
              PreviousPage: React.forwardRef((props, ref) => (
                <ArrowBack ref={ref} />
              )),
              NextPage: React.forwardRef((props, ref) => (
                <ArrowForward ref={ref} />
              )),
            }}
            detailPanel={(rowData) => {
              return (
                <div id="project-features">
                  
                  <MaterialTable
                    title="Contact List"
                    columns={[
                      {
                        title: "Id",
                        field: "Id",
                        align: "center",
                        emptyValue: "N/A",
                      },
                      {
                        title: "Name",
                        field: "Name",
                        align: "center",
                        emptyValue: "N/A",
                      },
                      {
                        title: "Title",
                        field: "Title",
                        align: "center",
                        emptyValue: "N/A",
                      },
                      {
                        title: "Phone",
                        field: "Phone",
                        align: "center",
                        emptyValue: "N/A",
                      },
                      {
                        title: "Department",
                        field: "Department",
                        align: "center",
                        emptyValue: "N/A",
                      },
                      {
                        title: "Email",
                        field: "Email",
                        align: "center",
                        emptyValue: "N/A",
                      },
                    ]}
                    data={
                      allAccounts.accounts[0]["data"]["records"].find(
                        (record) => record.Id === rowData.Id
                      )["Contacts"]["records"]
                    }
                    options={{
                      headerStyle: {
                        backgroundColor: "#ff9b5f",
                        fontSize: "1.15em",
                        textAlign: "center",
                        fontFamily: "sans-serif",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        color: "#FFF",
                      },
                      pageSize: allAccounts.accounts[0]["data"]["records"].find(
                        (record) => record.Id === rowData.Id
                      )["Contacts"]["totalSize"],
                      pageSizeOptions: [1, 2, 5, 10, 20],
                      toolbar: true,
                      paging: true,
                      paginationType: "normal",
                      rowStyle: {
                        fontSize: ".95em",
                        fontFamily: "sans-serif",
                      },
                    }}
                  />
                </div>
              );
            }}
            options={{
              headerStyle: {
                backgroundColor: "#01579b",
                fontSize: "1.15em",
                textAlign: "center",
                fontFamily: "sans-serif",
                color: "#FFF",
              },
              pageSize: 10,
              pageSizeOptions: [5, 10, 20],
              toolbar: true,
              paging: true,
              paginationType: "normal",
              rowStyle: {
                fontSize: ".95em",
                fontFamily: "sans-serif",
              },
              showTitle: false,
            }}
          />
        )}
      </div>
    </div>
  );
};
