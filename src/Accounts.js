import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Account.module.css';
import MaterialTable from 'material-table';
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import {ArrowUpward, ArrowBack, ArrowForward} from '@material-ui/icons'
import SaveIcon from "@material-ui/icons/Save";
import { Button } from "@material-ui/core";
import { apiResponse } from './demo';

export const Accounts = () => {

    const [error, setError] = useState(false);

    const [allAccounts, setAllAccounts] = useState({
        accounts: []
    });
   
    useEffect(() => {
        setError(false);

        const ACCOUNTS_URL = 'http://localhost:8080/data';

        const promise = axios.get(ACCOUNTS_URL)

        Promise.all([promise]).then(
            (res) => {
                setAllAccounts({
                    accounts: res
                });
            },
            (err) => {
                if(err) {
                    setError(true);
                }
            }
        );
    }, [])

    return (
        <>
        <div className="App">
      <h1>Accounts</h1>
      {/* <a
        target="_blank"
        href="https://smartdevpreneur.com/intro-to-material-table-for-react/"
      >
        Click here for an intro to material-table
      </a> */}
      <div style={{ maxWidth: "100%", paddingTop: "12px" }} className={styles.table}>
          {allAccounts.accounts.length > 0 && console.log(allAccounts.accounts[0]['data']['records'])}
          {allAccounts.accounts.length > 0 && 
        <MaterialTable 
          columns={[
            {
              title: "Id",
              field: "Id",
              align: "center",
              emptyValue: "N/A",
              headerStyle: {
                backgroundColor: "#01579b"
              }
            },
            {
              title: "Name",
              field: "Name",
              align: "center",
              emptyValue: "N/A",
              headerStyle: {
                backgroundColor: "#01579b"
              }
            },
            {
              title: "Annual Revenue",
              field: "AnnualRevenue",
              type: "numeric",
              align: "center",
              emptyValue: "N/A",
              headerStyle: {
                backgroundColor: "#01579b"
              }
            },
            {
                title: "Website",
                field: "Website",
                align: "center",
                emptyValue: "N/A",
                headerStyle: {
                  backgroundColor: "#01579b"
                }
              },
              {
                title: "Account Number",
                field: "AccountNumber",
                align: "center",
                emptyValue: "N/A",
                headerStyle: {
                  backgroundColor: "#01579b"
                }
              },
              {
                title: "Rating",
                field: "Rating",
                align: "center",
                emptyValue: "N/A",
                headerStyle: {
                  backgroundColor: "#01579b"
                }
              },
              {
                title: "Upsell Opportunity",
                field: "UpsellOpportunity__c",
                align: "center",
                emptyValue: "N/A",
                headerStyle: {
                  backgroundColor: "#01579b"
                }
              },
              {
                  title: "Contacts",
                  field: "Contacts.totalSize",
                  align: "center",
                  emptyValue: "N/A",
                  type: "numeric",
                  headerStyle: {
                    backgroundColor: "#01579b"
                  }
                }
          ]}
         
          data={allAccounts.accounts[0]['data']['records']}
        //   pagination={}
        //   title="Material-Table Demo"
          icons={{
            Clear: React.forwardRef((props, ref) => <DeleteIcon ref={ref}/>),
            Search: React.forwardRef((props, ref) => <SearchIcon ref={ref}/>),
            ResetSearch: React.forwardRef((props, ref) => <DeleteIcon ref={ref}/>),
            // SortArrow: props => <ArrowDownward {...props} fontSize="small" />
            SortArrow: React.forwardRef((props, ref) => <ArrowUpward {...props} fontSize="small" ref={ref}/>),
            PreviousPage: React.forwardRef((props, ref) => <ArrowBack ref={ref}/>),
            NextPage: React.forwardRef((props, ref) => <ArrowForward ref={ref}/>)
          }}
        //   actions={[
        //     {
        //       icon: () => <SaveIcon />,
        //       tooltip: "Save User",
        //       onClick: (event, rowData) => alert("You saved " + rowData.name)
        //     }
        //   ]}
          components={{
            
            // Action: (props) => (
            //   <Button
            //     onClick={(event) => props.action.onClick(event, props.data)}
            //     color="primary"
            //     variant="text"
            //     style={{ textTransform: "none" }}
            //     size="small"
            //   >
            //     Save
            //   </Button>
            // )
          }}
          options={{
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF"
            },
            showFirstLastPageButtons: false,
            paginationType: "normal",
          }}
        />}
      </div>
    </div>
        </>
    );
};


