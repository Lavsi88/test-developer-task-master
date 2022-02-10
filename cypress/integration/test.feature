Feature: Validate the assests functionality

    Scenario Outline: Validate adding assets
        Given user is on home page
        When user click on the add assets
        And enter <assetID> and click on send button
        Then validate that the asset is successfully added

        Examples:
            | assetID          |
            | "ABCD1234567004" |

    Scenario Outline: Validate already existing assets
        Given user is on home page
        When user click on the add assets
        And enter <assetID> and click on send button
        Then validate that the asset is already added message appear

        Examples:
            | assetID          |
            | "ABCD1234567002" |

    Scenario Outline: Validate search asset
        Given user is on home page
        When user click on the existing assets
        And enter <assetID>
        Then validate that the asset table display the existing assest <assetID>

        Examples:
            | assetID          |
            | "ABCD1234567002" |

    Scenario Outline: Validate search asset format
        Given user is on home page
        When user click on the add assets
        Then enter <assetID> and click on send button and validate format the error message displayed

        Examples:
            | assetID |
            | "12345" |

    Scenario: Validate filter asset
        Given user is on home page
        When user click on the existing assets
        And user click on filter
        Then validate that the table is filtered out
